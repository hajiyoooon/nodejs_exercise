var cookieParser = require('cookie-parser');

var mysql = require('mysql');
var conn = mysql.createConnection({
    host : 'localhost',
    port : '3306',
    user : 'root',
    password: '1234',
    database: 'jsman',
});
conn.connect();

let users = new Map();

function sessionExists (user) {
    return users.has(user.email);
}

function login(user) {
    if (sessionExists(user)) return false;

    let query = conn.query(`select * from user where email=?`, user.email, (err, rows, fields) => {
        if (err) throw err;

        if (rows[0]) {
            users.set(user.email, user);
        } else {
            return false;
        }
    });

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