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

            let responseData = {};
            if (rows.length) {
                responseData.result = 1;
                responseData.data = rows;
            } else {
                responseData.result = 0;
            }
        res.json(responseData);
    });
})

// /movie, post
router.post('/', (req, res) => {
    let title = req.body.title;
    let type = req.body.type;
    let grade = req.body.grade;
    let actor = req.body.actor;
    
    let sql = {title, type, grade, actor};
    let query = conn.query(
        `insert into movie set ?`, sql, (err, rows, fields) => {
            if (err) throw err;

            return res.json({'result' : 1});
    });
})

// /movie/:title, post
router.get('/:title', (req, res) => {
    let title = req.params.title;
    
    let query = conn.query(
        `select * from movie where title="${title}"`, (err, rows, fields) => {
            if (err) throw err;

            let responseData = {};
            if (rows[0]) {
                responseData.result = 1;
                responseData.data = rows;
                return res.json(responseData);
            }

            return res.json({'result' : 0});
    });
})

// /movie/:title, post
router.delete('/:title', (req, res) => {
    let title = req.params.title;
    
    let query = conn.query(
        `delete from movie where title="${title}"`, (err, rows, fields) => {
            if (err) throw err;

            let responseData = {};
            if (rows.affectedRow === 1) {
                responseData.result = 1;
                responseData.data = title;
            } else {
                responseData.result = 0;
            }

            return res.json(responseData);
    });
})

module.exports = router