var express = require('express');
var app = express();
var router = express.Router();
var path = require('path');
var cookieSession = require('cookie-session');

router.get('/', (req, res)=> {
    var loginHelper = require('./session');
    if (loginHelper.sessionExists(req.session)) {
        res.redirect('/main');
    } else {
        res.sendFile(path.join(__dirname, '../public/login.html'));
    }
});

router.get('/main', (req, res) => {
    res.render('main.ejs');
});

// url routing
var login = require('./login/index');
router.use('/login', login);

var join = require('./join/index');
router.use('/join', join);

var join = require('./logout/index');
router.use('/logout', join);

module.exports = router;