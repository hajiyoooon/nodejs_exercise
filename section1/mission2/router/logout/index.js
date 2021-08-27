var express = require('express');
var app = express();
var router = express.Router();
var loginHelper = require('../session');

router.get('/', (req, res) => {
    if (loginHelper.logout({'email': req.body.email})) {
        res.redirect('/main');
    } else {
        res.json({'message' : 'login failed'});
    }
});

module.exports = router;