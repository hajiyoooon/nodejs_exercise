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

function sessionExists (session) {
    console.log(`sessionExists : ${session.authenticated}`);
    return session.authenticated;
}

function login(user, req) {
    if (sessionExists(user)) return false;

    let query = conn.query(`select * from user where email=?`, user.email, (err, rows, fields) => {
        if (err) throw err;

        if (rows[0]) {
            req.session.authenticated = true;
            return true;
        }
    });

    return false;
}

function logout(req) {
    req.session.authenticated = false;
    return true;
}

module.exports = {
    'sessionExists' : sessionExists,
    'login' : login,
    'logout' : logout
};