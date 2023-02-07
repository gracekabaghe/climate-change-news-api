const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const { response } = require('express');

const newspapers = [
    {
        name: 'cityam',
        address: 'https://www.cityam.com/london-must-become-a-world-leader-on-climate-change-action/',
    },

    {
        name: 'BBC',
        address: 'https://www.bbc.com/future/future-planet/',
    },

    {
        name: 'Sky News',
        address: 'https://news.sky.com/climate',
    },

    {
        name: 'thetimes',
        address: 'https://www.thetimes.co.uk/environment/climate-change',
        
    }
];

newspapers.forEach(newspaper => {
    axios.get(newspaper.address)
    .then(response => {
        const html = response.data;
        const $ = cheerio.load(html)

         $('a:contains("climate")', html).each(function () {
            const title = $(this).text();
            const url = $(this).attr('href')
            articles.push({
                title,
                url,
                source: newspaper.name
            })
        })
    })
})

const articles = [];

const PORT = process.env.PORT || 5000;

const app = express();

// app.get('/', (req, res) => {
//     res.json('Top Stories')

// });

app.get('/', (req, res) =>{
    res.send('<h1>Top Climate News Headlines API</h1>');

});

app.get('/news', (req, res) => {
    res.json(articles);

});

app.get('/news/:newspaperId', (req, res) => {
    const newspaperId = req.params.newspaperId

    const newspaperAddress = newspapers.filter(newspaper => newspaper.name == newspaperId)[0].address
    const newspaperBase = newspapers.filter(newspaper => newspaper.name == newspaperId)[0].base


    axios.get(newspaperAddress)
        .then(response => {
            const html = response.data
            const $ = cheerio.load(html)
            const specificArticles = []

            $('a:contains("climate")', html).each(function () {
                const title = $(this).text()
                const url = $(this).attr('href')
                specificArticles.push({
                    title,
                    url: newspaperBase + url,
                    source: newspaperId
                })
            })
            res.json(specificArticles)
        }).catch(err => console.log(err))

    });

app.listen(PORT, () => console.log(`server running on PORT ${PORT}`));

