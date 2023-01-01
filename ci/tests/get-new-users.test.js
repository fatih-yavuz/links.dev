const getNewUsers = require('../util/get-new-users');

test('getNewUsers should return only new users in the registry', async () => {
    const existingUsers = {
        user1: {
            github_username: 'user1'
        },
        user2: {
            github_username: 'user2'
        }
    };

    const productionRegistry = {
        users: {
            user1: {
                github_username: 'user1'
            }
        }
    };


    const newUsers = await getNewUsers(existingUsers, productionRegistry);
    expect(newUsers).toEqual({
        user2: {
            github_username: 'user2'
        }
    });
});
