const fs = require('fs');
const yaml = require('yaml');
const axios = require('axios');
const crypto = require('crypto');

const checkDuplicateGithubUserNames = require('./util/duplicate-check-gh-username')
const getNewUsers = require("./util/get-new-users");
const downloadRegistry = require("./util/download-registry");
const getRestrictedUsernames = require('./util/get-restricted-usernames');
const getRegistry = require('./util/get-registry');
const {
    validateGitHubUsernameExistsOnRegistry,
    validateUsernameIsNotRestricted,
    validatePage
} = require('./util/validation');
const {productionRegistryUri} = require("./util/constant");
const hashedContents = new Set();


function getHash(pageJsonContent) {
    return crypto.createHash('sha256').update(JSON.stringify(pageJsonContent)).digest('hex');
}

async function validateRegistry() {
    const restrictedUsernames = getRestrictedUsernames();
    const registry = getRegistry();

    await checkDuplicateGithubUserNames(registry.users)
    await addFatihToTheRegistryForCheckingPageDuplication();



    console.log("Validating " + Object.keys(registry.users).length + " users..")
    for (const username in registry.users) {
        const user = registry.users[username];
        validateGitHubUsernameExistsOnRegistry(user);
        validateUsernameIsNotRestricted(restrictedUsernames, user);

        const pageJsonUrl = `https://raw.githubusercontent.com/${user.github_username}/my-links/main/page.json`;
        console.log("Trying to retrieve " + pageJsonUrl);
        const pageJsonResponse = await axios.get(pageJsonUrl);

        const pageJsonContent = validatePage(pageJsonResponse, user);

        const hash = getHash(pageJsonContent);
        if (hashedContents.has(hash)) {
            console.error(`The page.json file for user "${user}" is a duplicate ${pageJsonUrl}`);
            process.exit(1);
        }

        hashedContents.add(hash);


        const imageUrlResponse = await axios.get(pageJsonContent.image_url, {responseType: 'arraybuffer'});
        if (imageUrlResponse.status !== 200) {
            throw new Error(`Invalid image_url for user "${username}". HTTP status code: ${imageUrlResponse.status}`);
        }


    }
    console.log('Registry validation successful.');

    async function addFatihToTheRegistryForCheckingPageDuplication() {
        registry.users = await getNewUsers(registry.users, await downloadRegistry(productionRegistryUri));
        users = {
            'fatih': {
                'github_username': 'fatih-yavuz'
            }
        };

        for (const username in registry.users) {
            const user = registry.users[username];
            users[user.github_username] = user;
        }

        registry.users = users;
    }
}


async function main() {
    try {
        await validateRegistry();
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
}


main();
