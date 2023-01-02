const fs = require("fs");
const yaml = require("yaml");
module.exports = function () {
  const registryPath = "./registry.yaml";
  const registryFileContent = fs.readFileSync(registryPath, "utf8");
  const registry = yaml.parse(registryFileContent);
  if (!registry || !registry.users) {
    throw new Error('Invalid registry format. The "users" key is missing.');
  }
  return registry;
};
