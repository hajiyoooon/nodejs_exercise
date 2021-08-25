var express = require('express');
var app = express();
var router = express.Router();
var path = require('path');

router.get('/', function(req, res) {
    console.log(`main js loaded ${req.user}`)
    let id = req.user;
    if (!id) res.render('login.ejs');
    res.render('main.ejs', {'id' : id});
});

module.exports = router;