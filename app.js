const express = require('express');
const app = express();
const request = require('request');
const apikey = require('./apikeys.js');

const server = app.listen(3000, "127.0.0.1", function() {
    let host = server.address().address;
    let port = server.address().port;
    console.log('server running at:');
    console.log('http://' + host + ':' + port);
});

app.set('view engine', 'ejs');

app.use(express.static('public'));

app.get('/', function(req, res) {
    const url = 'https://newsapi.org/v2/top-headlines?sources=the-verge&';
    const key = apikey.SECRET_KEY; // taken from exported object in ./apikeys.js
    request(url + key, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            let data = JSON.parse(body);
            res.render('index', {data: data});
        } else {
            console.log(error);
        } 
    }); 
});

app.listen(process.env.PORT, process.env.IP, function() {
   console.log('server started'); 
});