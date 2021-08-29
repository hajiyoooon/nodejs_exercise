var express = require('express');
var app = express();
var router = express.Router();
var loginHelper = require('../session');

router.post('/', (req, res) => {
    console.log('POST / ')
    if (loginHelper.sessionExists(req.session)) {
        res.json({'result' : 'ok'});
    }
    if (loginHelper.login({'email': req.body.email, 'password' : req.body.password}, req)) {
        res.json({'result' : 'ok'});
    } else {
        res.json({'result' : 'fail', 'msg' : 'failed to login'});
    }
});

module.exports = router;