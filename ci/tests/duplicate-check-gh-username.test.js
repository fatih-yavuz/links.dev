const checkDuplicateGithubUserNames = require("../util/duplicate-check-gh-username");



test("correct scenario, 2 different github usernames, 2 different domains", async () => {
    await expect(checkDuplicateGithubUserNames({
        "alice": {"github_username": "alice-gh"},
        "bob": {"github_username": "bob-gh"},
    })).resolves.toBeUndefined() // no error
});


test("wrong scenario, 2 same github username, 2 different domains", async () => {
    expect.assertions(1);
    await expect(checkDuplicateGithubUserNames({
        "alice": {"github_username": "alice-gh"},
        "bob": {"github_username": "alice-gh"},
    })).rejects.toThrow('There are duplicated github usernames in the array')
});


