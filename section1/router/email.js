var express = require('express');
var app = express();
var router = express.Router();

var mysql = require('mysql');
// const { response } = require('express');
var conn = mysql.createConnection({
    host : 'localhost',
    port : '3306',
    user : 'root',
    password: '1234',
    database: 'jsman',
});

conn.connect();

router.post('/form', function(req, res) {
	res.render('email.ejs', {'email' : req.body.email});
});

router.post('/ajax', function(req, res) {
    let email = req.body.email;
    let responseData = {};

    let query = conn.query(
        `select name from user where email="${email}"`, 
        (err, rows, fields) => {
            if (err) throw err;
            if (rows[0]) {
                responseData.result = 'ok';
                responseData.name = rows[0].name;
            } else {
                responseData.result = 'fail';
            }
        res.json(responseData);
    });

});

module.exports = router;
