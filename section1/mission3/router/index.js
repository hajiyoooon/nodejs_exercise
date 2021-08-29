var express = require('express');
var app = express();
var router = express.Router();
var path = require('path');

router.get('/', (req, res)=> {
    res.render('login');
});

var join = require('./join/index');
router.use('/join', join);

var join = require('./login/index');
router.use('/login', join);

module.exports = router;