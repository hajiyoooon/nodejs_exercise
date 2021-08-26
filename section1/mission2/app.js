var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var router = require('./router/index');

app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use(router);

app.listen(3000, () => {
    console.log("start! express server on port 3000");
});

