const fs = require('fs');
const yaml = require('yaml');
const axios = require('axios');
const path = require('path');

async function validateRegistry() {
  // Read the registry.yaml file
  const registryContent = fs.readFileSync('registry.yaml', 'utf8');
  // Parse the yaml content
  const registry = yaml.parse(registryContent);
  // Validate the structure of the registry
  if (!registry || !registry.users) {
    throw new Error('Invalid registry format. The "users" key is missing.');
  }
  // Validate each user
  for (const username in registry.users) {
    const user = registry.users[username];
    if (!user.github_username) {
      throw new Error(`Invalid registry format. The user "${username}" is missing the "github_username" field.`);
    }
    // Make a request to the user's page.json file
    const pageJsonUrl = `https://raw.githubusercontent.com/${user.github_username}/my-links/main/page.json`;
    console.log(pageJsonUrl);
    const pageJsonResponse = await axios.get(pageJsonUrl);

    if (pageJsonResponse.status !== 200) {
      throw new Error(`Failed to fetch page.json for user "${username}". HTTP status code: ${pageJsonResponse.status}`);
    }
    const pageJsonContent = pageJsonResponse.data;
    // Validate the structure of the page.json file
    if (!pageJsonContent || !pageJsonContent.name || !pageJsonContent.description || !pageJsonContent.image_url || !pageJsonContent.links) {
      throw new Error(`Invalid page.json format for user "${username}".`);
    }
    // Validate the image_url field
    const imageUrlResponse = await axios.get(pageJsonContent.image_url, { responseType: 'arraybuffer' });
    if (imageUrlResponse.status !== 200) {
      throw new Error(`Invalid image_url for user "${username}". HTTP status code: ${imageUrlResponse.status}`);
    }
  }
  console.log('Registry validation successful.');
}

async function main() {
  await validateRegistry();
}

main();