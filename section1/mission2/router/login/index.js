var express = require('express');
var app = express();
var router = express.Router();
var loginHelper = require('../session');
var cookieSession = require('cookie-session');
var cookieParser = require('cookie-parser');

router.use(cookieParser('my secret here'));

router.get('/', (req, res) => {
    if (req.cookies && loginHelper.sessionExists(req.cookies.remember)) {
        res.redirect('/main');
    }
    res.render('login.ejs');
});

router.post('/', (req, res) => {
    if (req.cookies && loginHelper.sessionExists(req.cookies.remember)) {
        res.redirect('/main');
    }
    if (loginHelper.login({'email': req.body.email, 'password' : req.body.password})) {
        res.cookie('remember', req.body.email, {maxAge : 60000});
        res.redirect('/main');
    } else {
        res.json({'message' : 'login failed'});
    }
});

module.exports = router;