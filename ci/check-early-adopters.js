const fs = require('fs');
const yaml = require('js-yaml');
const axios = require('axios');

async function validateEarlyAdopters() {
  // Read the early-adopters.js file
  const earlyAdoptersFileContent = fs.readFileSync('early-adopters.js', 'utf8');

  // Evaluate the file content to get the users array
  eval(earlyAdoptersFileContent);

  // Validate that the users variable is an array of objects
  if (!Array.isArray(users) || !users.every(user => typeof user === 'object')) {
    throw new Error('The users variable should be an array of objects');
  }

  // Validate that each user object has the required properties
  for (const user of users) {
    if (!user.hasOwnProperty('name') || !user.hasOwnProperty('username') || !user.hasOwnProperty('description') || !user.hasOwnProperty('image')) {
      throw new Error('Each user object should have the following properties: name, username, description, image');
    }
  }

  // Validate that the image field of each user holds a valid URL
  for (const user of users) {
    try {
      new URL(user.image);
    } catch (error) {
      throw new Error(`The image field of user ${user.username} does not contain a valid URL`);
    }
  }

  // Verify that the content of the URL in the image field is an actual image
  for (const user of users) {
    const response = await axios.get(user.image, {
      responseType: 'arraybuffer'
    });

    // Check the content-type of the response to verify that it is an image
    if (!response.headers['content-type'].startsWith('image/')) {
      throw new Error(`The URL in the image field of user ${user.username} does not contain an image`);
    }
  }

  // Read the registry.yaml file
  const registryFileContent = fs.readFileSync('registry.yaml', 'utf8');

  // Parse the registry.yaml file
  const registry = yaml.load(registryFileContent);

  // Validate that each user.username exists under users in the registry.yaml file
  for (const user of users) {
    if (!registry.users.hasOwnProperty(user.username)) {
      throw new Error(`User ${user.username} does not exist in the registry`);
    }
  }

  // Verify that each user exists only one time in the array
  const uniqueUsernames = new Set(users.map(user => user.username));
  if (uniqueUsernames.size !== users.length) {
    throw new Error('There are duplicate users in the array');
  }
}

try {
  validateEarlyAdopters();
  console.log('The early-adopters.js file is valid');
} catch (error) {
  console.error(error.message);
}
