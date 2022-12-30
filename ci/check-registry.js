const productionRegistryUri = 'https://raw.githubusercontent.com/fatih-yavuz/links.dev/main/registry.yaml';
const shouldCheckOnlyNewUsers = true;

const fs = require('fs');
const request = require('request');
const yaml = require('yaml');
const axios = require('axios');
const path = require('path');
const crypto = require('crypto');

const checkDuplicateGithubUserNames = require('./registry/duplicate-check-ghusername')
// Create a set to store the hashes of the pageJsonContent strings
const hashedContents = new Set();

async function validateRegistry() {
    // Read the registry.yaml file
    const isCI = process.env.CI;
    const registryPath = !isCI ? '../registry.yaml' : 'registry.yaml';
    const registryFileContent = fs.readFileSync(registryPath, 'utf8');
    let restrictedUsernamesPath = !isCI ? '../restricted-usernames.yaml' : 'restricted-usernames.yaml';
    const restrictedUsernamesFileContent = fs.readFileSync(restrictedUsernamesPath, 'utf8');
    const restrictedUsernames = yaml.parse(restrictedUsernamesFileContent).restricted_usernames;

    const registry = yaml.parse(registryFileContent);
    // Validate the structure of the registry
    if (!registry || !registry.users) {
        throw new Error('Invalid registry format. The "users" key is missing.');
    }

    // Verify that each github username has only one prefix/domain 
    checkDuplicateGithubUserNames(registry.users)


    // Get only new users
    const productionRegistry = await downloadRegistry();

    const registryUsers = Object.entries(registry.users);
  
    const newUsers = Object.fromEntries(
        registryUsers.filter(function([key]) { 
            console.log(key);
            console.log(productionRegistry.users.hasOwnProperty(key));
            return !productionRegistry.users.hasOwnProperty(key);
          })
    );

    if(shouldCheckOnlyNewUsers) {
        console.log("shouldCheckOnlyNewUsers flag enabled. Script will check only new users.")
        registry.users = newUsers;
    }
 

    // Validate each user
    console.log("Validating " + registry.users.length + " users..")
    for (const username in registry.users) {
        const user = registry.users[username];
        if (!user.github_username) {
            throw new Error(`Invalid registry format. The user "${username}" is missing the "github_username" field.`);
        }

        if (restrictedUsernames.includes(user.github_username)) {
            throw new Error(`The user "${username}" has a restricted username.`);
        }

        // Make a request to the user's page.json file
        const pageJsonUrl = `https://raw.githubusercontent.com/${user.github_username}/my-links/main/page.json`;
        console.log("Trying to retrieve " + pageJsonUrl);
        const pageJsonResponse = await axios.get(pageJsonUrl);


        if (pageJsonResponse.status !== 200) {
            throw new Error(`Failed to fetch page.json for user "${username}". HTTP status code: ${pageJsonResponse.status}`);
        }

        const pageJsonContent = pageJsonResponse.data;

        // Validate the structure of the page.json file
        if (!pageJsonContent || !pageJsonContent.name || !pageJsonContent.description || !pageJsonContent.image_url || !pageJsonContent.links) {
            throw new Error(`Invalid page.json format for user "${username}".`);
        }

        const hash = crypto.createHash('sha256').update(JSON.stringify(pageJsonContent)).digest('hex');
        if (hashedContents.has(hash)) {
            console.error('The page.json file for user "' + username + '" is a duplicate ' + pageJsonUrl);
            process.exit(1);
        }

        hashedContents.add(hash);


        // Validate the image_url field
        try {
            const imageUrlResponse = await axios.get(pageJsonContent.image_url, {responseType: 'arraybuffer'});
            if (imageUrlResponse.status !== 200) {
                throw new Error(`Invalid image_url for user "${username}". HTTP status code: ${imageUrlResponse.status}`);
            }
        } catch (e) {
            console.warn(`Invalid image_url for user "${username}".`);
        }


    }
    console.log('Registry validation successful.');
}


async function downloadRegistry() {
    return new Promise((resolve, reject) => {
      request.get(productionRegistryUri, function(error, response, body) {
        if (!error && response.statusCode == 200) {
          var productionRegistryFileContent = body;
          resolve(yaml.parse(productionRegistryFileContent));
        }
        reject('Invalid status code <' + response.statusCode + '>');
      });
    });
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
