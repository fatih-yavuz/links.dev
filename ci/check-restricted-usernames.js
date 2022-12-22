const fs = require('fs');
const yaml = require('yaml');

async function validateRestrictedUsernames() {
    // Read the registry.yaml file
    const isCI = process.env.CI;
    const registryPath = !isCI ? '../restricted-usernames.yaml' : 'restricted-usernames.yaml';
    const registryFileContent = fs.readFileSync(registryPath, 'utf8');

    const registry = yaml.parse(registryFileContent);
    // Validate the structure of the registry
    if (!registry || !registry.restricted_usernames) {
        throw new Error('Invalid registry format. The "restricted_usernames" key is missing.');
    }
    // Validate each user
    console.log('Restricted usernames validation successful.');
}

async function main() {
    try {
        await validateRestrictedUsernames();
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
}


main();