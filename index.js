const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const PORT = 5000;

const app = express();

app.get('/', (req, res) => {
    res.json('Climate change news')

});

app.listen(PORT, () => {console.log(`Server running on ${PORT}`)});