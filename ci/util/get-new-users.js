module.exports = async function (existingUsers, productionRegistry) {
    const registryUsers = Object.entries(existingUsers);

    return Object.fromEntries(
        registryUsers.filter(([key]) => !productionRegistry.users.hasOwnProperty(key))
    );
}