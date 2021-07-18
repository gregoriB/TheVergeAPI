require('dotenv').config()
const path = require('path');
const serverless = require('serverless-http');
const express = require('express');
const app = express();
const request = require('request');
const router = express.Router();

app.use(express.static(path.join(__dirname, 'public')));

router.get('/', (req, res) => {
    const url = 'https://newsapi.org/v2/top-headlines?sources=the-verge&apiKey=';
    const key = process.env.API_KEY;
    request(url + key, (error, response, body) => {
        if (error) throw error;
        if (response.statusCode !== 200) {
            return res.send(response.statusCode);
        }
        const data = JSON.parse(body);
        const ejs = require('ejs').render(template, { data })
        res.send(ejs);
    }); 
});

app.use('/.netlify/functions/server', router);
app.use('/', (req, res) => res.sendFile(path.join(__dirname, '../index.html')));

module.exports.handler = serverless(app);

var template = `
<div class='container'>
        <!-- ASSIGN RANDOM BANNER OUT OF 10 IMAGE FILES -->
    <% const random = Math.floor(Math.random() * 10) %>
    <div class='banner' style='background-image:url(/images/banner<%=random%>.png)'>
        <img class='logo' src='/images/logo.png'>
        <h1 class='heading'>Top Articles</h1>
    </div>
    
    <div class="flex-container">

            <!-- CREATE ARTICLE BOX USING API CONTENT -->
        <% data.articles.forEach(story => { %>
            <% const time = new Date(story['publishedAt']) %>
            <% const title = story['title'] %>
            <% const author = story['author'] %>
            <% const image = story['urlToImage'] %>
            <% const imageNoSpaces = image.replace(/\s+/g,"%20")%> <!-- REPLACES SPACES WITH '%20' TO AVOID BLANK IMAGES -->
            <% const description = story['description'] %>
            <% const url = story['url'] %>
            <% const link = 'Read the full article...' %>        
            
            <ul>
                <li class='date'>
                    <%= time.toDateString() %>
                </li>

                <li class='title'>
                    <a href='<%=url%>' target='_blank'>
                        <h3><%= title %></h3>
                    </a>
                </li>

                <li>
                    BY 
                    <span class='author'>
                        <!-- STOPS AUTHOR COLLABORATIONS AND NULL VALUES FROM BREAKING THE FORMAT -->
                        <% if (author && author.indexOf(',') < 1) { %> 
                            <%= author %> 
                        <% } else { %> 
                            The Verge Staff 
                        <% } %>
                    </span>
                </li>

                <li class='image'>
                    <img src='<%=imageNoSpaces%>'>
                </li>

                <% if (description && description != "") { %> 
                    <li class='desc'><%= description %></li> 
                <% } %>

                <li class='link'>
                    <a href='<%=url%>' target='_blank'>
                        <%= link %>
                    </a>
                </li>
            </ul>
        <% }) %>

    </div>
    <script>
        console.log('HELLO FROM THE SCRIPT TAG)
    </script>
</div>
`