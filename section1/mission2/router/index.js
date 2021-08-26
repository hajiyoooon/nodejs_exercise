var express = require('express');
var app = express();
var router = express.Router();
var path = require('path');

router.get('/', (req, res)=> {
    res.sendFile(path.join(__dirname, `../public/login.html`))
});

// url routing
var login = require('./login/index');
router.use('/login', login);

module.exports = router;