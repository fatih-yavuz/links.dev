function validateGitHubUsernameExistsOnRegistry(user) {
    if (!user.github_username) {
        throw new Error(`Invalid registry format. The user "${user}" is missing the "github_username" field.`);
    }
}

function validateUsernameIsNotRestricted(restrictedUsernames, user) {
    if (restrictedUsernames.includes(user.github_username)) {
        throw new Error(`The user "${user}" has a restricted username.`);
    }
}

function validatePage(pageJsonResponse, user) {
    if (pageJsonResponse.status !== 200) {
        throw new Error(`Failed to fetch page.json for user "${user.username}". HTTP status code: ${pageJsonResponse.status}`);
    }

    const pageJsonContent = pageJsonResponse.data;

    // Validate the structure of the page.json file
    if (!pageJsonContent || !pageJsonContent.name || !pageJsonContent.description || !pageJsonContent.image_url || !pageJsonContent.links) {
        throw new Error(`Invalid page.json format for user "${user.username}".`);
    }
    return pageJsonContent;
}

exports.validateGitHubUsernameExistsOnRegistry = validateGitHubUsernameExistsOnRegistry;
exports.validateUsernameIsNotRestricted = validateUsernameIsNotRestricted;
exports.validatePage = validatePage;
