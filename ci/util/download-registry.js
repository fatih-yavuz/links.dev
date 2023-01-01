const axios = require("axios");
const yaml = require("yaml");

module.exports = async function (productionRegistryUri) {
    const response = await axios.get(productionRegistryUri);
    return yaml.parse(response.data);
}