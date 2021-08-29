var express = require('express');
var app = express();
var router = express.Router();
var loginHelper = require('../session');
var cookieSession = require('cookie-session');
router.get('/', (req, res) => {
    res.render('login.ejs');
});

router.post('/', (req, res) => {
    if (loginHelper.login({'email': req.body.email, 'password' : req.body.password})) {
        res.cookie('remember', 1, {maxAge : 60000});
        res.redirect('/main');
    } else {
        res.json({'message' : 'login failed'});
    }
});

module.exports = router;