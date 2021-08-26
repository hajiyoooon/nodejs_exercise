var express = require('express');
var app = express();
var router = express.Router();
var path = require('path');

var mysql = require('mysql');
var conn = mysql.createConnection({
    host : 'localhost',
    port : '3306',
    user : 'root',
    password: '1234',
    database: 'jsman',
});

conn.connect();

router.get('/list', (req, res) => {
    res.render('movie.ejs');
});

// /movie, get
router.get('/', (req, res) => {
    let query = conn.query(
        `select title from movie`, (err, rows, fields) => {
            if (err) throw err;
            if (rows.length) {
                responseData.result = 1;
                responseData.data = rows;
            } else {
                responseData.result = 0;
            }
        res.json(responseData);
    });
})

//

module.exports = router