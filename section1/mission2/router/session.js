let users = new Map();

function sessionExists (user) {
    return users.has(user.email);
}

function login(user) {
    if (sessionExists(user)) return false;

    users.set(user.email, user);
    return true;
}

function logout(user) {
    if (!sessionExists(user)) return false;

    users.delete(user.email);
    return true;
}

module.exports = {
    'sessionExists' : sessionExists,
    'login' : login,
    'logout' : logout
};