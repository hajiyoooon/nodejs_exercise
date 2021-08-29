var express = require('express');
var app = express();
var router = express.Router();
var path = require('path');

router.get('/', (req, res)=> {
    res.render('login');
});

module.exports = router;