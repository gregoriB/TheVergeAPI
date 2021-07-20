require('dotenv').config()
const express = require('express');
const app = express();
const request = require('request');

app.set('view engine', 'ejs');

app.use(express.static('public'));

app.get('/', (req, res) =>  {
    const url = 'https://newsapi.org/v2/top-headlines?sources=the-verge&apiKey=';
    const key = process.env.API_KEY;
    request(url + key, (error, response, body) => {
        if (error) throw error;
        if (response.statusCode !== 200) return res.send(response.statusCode);

        const data = JSON.parse(body);
        res.render('index', {data: data});
    }); 
});

const port = process.env.PORT || 8080;
const listener = app.listen(port, () => {
    console.log(`app listening on port: ${listener.address().port}`);
});