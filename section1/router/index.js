var express = require('express');
var app = express();
var router = express.Router();
var path = require('path');

router.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, `../public/main.html`));
});

// url routing
var main = require('./main/main');
var email = require('./email');
var join = require('./join/index');
var login = require('./login', login);
var movie = require('./movie');

router.use('/main', main);
router.use('/email', email);
router.use('/join', join);
router.use('/login', login);
router.use('/logout', login);
router.use('/movie', movie);
module.exports = router;
