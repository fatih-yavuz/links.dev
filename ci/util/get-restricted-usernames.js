const fs = require("fs");
const yaml = require("yaml");
module.exports = function () {
    const isCI = process.env.CI;
    let restrictedUsernamesPath = !isCI ? '../restricted-usernames.yaml' : 'restricted-usernames.yaml';
    const restrictedUsernamesFileContent = fs.readFileSync(restrictedUsernamesPath, 'utf8');
    return yaml.parse(restrictedUsernamesFileContent).restricted_usernames;
}