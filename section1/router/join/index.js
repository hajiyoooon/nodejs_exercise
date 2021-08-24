var express = require('express');
var app = express();
var router = express.Router();
var path = require('path');

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var mysql = require('mysql');
var conn = mysql.createConnection({
    host : 'localhost',
    port : '3306',
    user : 'root',
    password: '1234',
    database: 'jsman',
});

conn.connect();

router.get('/', function(req, res) {
    let msg;
    let errMsg = req.flash('error');
    if (errMsg) msg = errMsg;
    res.render('join.ejs', {'message' : msg});
});

// passport.serializeUser(() => {

// })

passport.use('local-join', new LocalStrategy({
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true,
    }, (req, email, password, done) => {
        console.log('local-join callback called');
        let query = connection.query(
            `select * from user where email="`, [email], (err, rows) => {
                if (err) return done(err);

                if(rows.length) {
                    console.log('user exists');
                    return done(null, false, {message:'your email is already exist'});
                } else {
                    let sql = {email : email, pw: password};
                    let query = connection.query(
                        `insert into suer set ?`, sql, (err, rows) => {
                            if (err) throw err;
                            return done (null, {'email' : email, 'id' : rows.insertId})
                        }
                    )
                }
            });
    })
);

router.post('/', 
    passport.authenticate('local-join', {
        successRedirect : '/main',
        failureRedirect: '/join',
        failureFlash: true,
    })
);

// router.post('/', (req, res) => {
//     let body = req.body;
//     let email = body.email;
//     let name = body.name;
//     let pw = body.password;

//     let sql = {email : email, name : name, pw : pw};
//     let query = conn.query(
//         'insert into user set ?', sql, (err, rows) => {
//             if (err) throw err;
//             console.log("success");

//             res.render('welcome.ejs', { 'name' : name, 'id' : rows.insertId});
//         }
//     );    
// });


module.exports = router;
