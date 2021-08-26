var express = require('express');
var app = express();
var router = express.Router();

var mysql = require('mysql');
var conn = mysql.createConnection({
    host : 'localhost',
    port : '3306',
    user : 'root',
    password: '1234',
    database: 'jsman',
});
conn.connect();

router.get('/', (req, res) => {
    res.render('login.ejs');
});

router.post('/', (req, res) => {
    console.log(req.body.email, req.body.password);
    let [email, password] = [req.body.email, req.body.password];
    let query = conn.query(`select * from user where email=?`, email, (err, rows, fields) => {
        if (err) throw err;

        if (rows[0]) {
            res.json({'message' : "join fail"});
        } else {
            let info = {email : email, pw: password};
            let query = conn.query(
                `insert into user set ?`, info, (err, rows) => {
                    if (err) throw err;
                    return res.json({'message' : "join success"});
                }
            )
        }
    });
    
});

module.exports = router;