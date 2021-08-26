var express = require('express');
var app = express();
var router = express.Router();
var path = require('path');

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

router.get('/', function(req, res) {
    req.logout();
    res.redirect();
});

module.exports = router;

