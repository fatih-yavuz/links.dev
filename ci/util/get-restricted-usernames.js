const fs = require("fs");
const yaml = require("yaml");
module.exports = function () {
    let restrictedUsernamesPath = './restricted-usernames.yaml';
    const restrictedUsernamesFileContent = fs.readFileSync(restrictedUsernamesPath, 'utf8');
    return yaml.parse(restrictedUsernamesFileContent).restricted_usernames;
}