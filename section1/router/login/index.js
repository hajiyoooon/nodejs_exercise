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
    res.render('login.ejs', {'message' : msg});
});

passport.serializeUser((user, done) => {
    console.log('passport session save : ', user.id);
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    console.log('passport session get : ', id);
    done(null, id);
})

passport.use('local-login', new LocalStrategy({
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true,
    }, (req, email, password, done) => {
        console.log('local-login callback called');
        let query = conn.query(
            `select * from user where email=?`, [email], (err, rows) => {
                if (err) return done(err);

                if(rows.length) {
                    let uid = 1;
                    return done(null, {'email' : email, 'id': uid});
                } else {
                    return done(null, false, { 'message' : 'email or password not found'});
                }
            });
    })
);

router.post('/', (req, res, next) => {
    console.log("login request");
    passport.authenticate('local-login', (err, user, info) => {
        if (err) { return res.status(500).json(err) };
        if (!user) { return res.status(401).json(info)};
        
        req.login(user, (err) => {
            if (err) { return next(err) };
            return res.json(user);
        });
    })(req, res, next);
});
module.exports = router;
