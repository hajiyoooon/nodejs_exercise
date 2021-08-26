var express = require('express');
var app = express();
var router = express.Router();
var loginHelper = require('../session');

router.get('/', (req, res) => {
    res.render('login.ejs');
});

router.post('/', (req, res) => {
    if (loginHelper.login({'email': req.body.email, 'password' : req.body.password})) {
        res.render('main.ejs',{ 'email' : req.body.email, 'message' : 'login succeed'});
    } else {
        res.json({'message' : 'login failed'});
    }
});

module.exports = router;