var express = require('express');
var app = express();
var router = express.Router();
var loginHelper = require('../session');

router.get('/', (req, res) => {
    if (loginHelper.logout(req)) {
        res.redirect('');
    } else {
        res.json({'message' : 'logout failed'});
    }
});

module.exports = router;