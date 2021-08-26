var express = require('express');
var app = express();
var router = express.Router();

router.get('/', (req, res) => {
    res.render('login.ejs');
});

router.post('/', (req, res) => {
    console.log(req.body);
    res.json({'message' : "join test"});
});

module.exports = router;