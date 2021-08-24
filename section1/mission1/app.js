var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.listen('3000', () => {
    console.log("Start the server...");
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static('public'));

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/public/main.html`);
});

app.post('/result', (req, res) => {
    console.log(req.body.entry);
});

app.post('/ajax_send', (req, res) => {
    console.log(req.body.entry);
    
    let responseData = {'result' : 'ok', 'data' : 'dummy'};
    res.json(responseData);
});