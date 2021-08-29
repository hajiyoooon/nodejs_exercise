var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var router = require('./router/index');
var cookieSession = require('cookie-session');
var cookieParser = require('cookie-parser');

app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use(cookieParser())
app.use(cookieSession({ secret: 'manny is cool' }));
app.use(router);



app.listen(3000, () => {
    console.log("start! express server on port 3000");
});

