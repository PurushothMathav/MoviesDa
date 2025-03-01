const express = require('express');
const request = require('request');
const cors = require('cors');
const path = require('path');
const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/check-links', (req, res) => {
    const links = req.body.links;
    let results = [];
    let completedRequests = 0;

    links.forEach(link => {
        request.head(link, (error, response) => {
            if (!error && response.statusCode === 200) {
                results.push({ link, status: 'Downloadable' });
            }

            completedRequests++;
            if (completedRequests === links.length) {
                res.json(results);
            }
        });
    });
});

app.listen(3000, () => {
    console.log('Proxy server running on port 3000');
});
