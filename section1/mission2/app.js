var express = require('express');
var app = express();
var router = require('./router/index');

app.use(express.static('public'));
app.use(router);

app.listen(3000, () => {
    console.log("start! express server on port 3000");
});

