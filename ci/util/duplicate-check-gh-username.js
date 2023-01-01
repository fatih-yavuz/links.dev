async function checkDuplicateGithubUserNames(users){
    // Verify that each github username has only one prefix/domain 
    const ghUsernames = Object.values(users).map(user => user.github_username);
    const duplicatedGhUsernames = ghUsernames.filter((ghUsername, index) => ghUsernames.indexOf(ghUsername) != index)

    if (duplicatedGhUsernames.length > 0) {
        console.log("duplicated github usernames:",duplicatedGhUsernames.join(","))
        throw new Error('There are duplicated github usernames in the array');
    }
}

module.exports = checkDuplicateGithubUserNames