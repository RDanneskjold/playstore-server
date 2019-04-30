const express = require('express');
const morgan = require('morgan');
const apps = require('./apps.js');

const app = express();

app.use(morgan('common'));

app.get('/apps', (req, res) => {
    const { search = "", sort, genres} = req.query;

    console.log(req.query.genres);

    if (sort) {
        if (!['Rating', 'App'].includes(sort)) {
            return res
                .status(400)
                .send('Sort must be one of Rating or App');
        }
    }

    if(genres) {
        if (!['Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade', 'Card'].includes(genres)) {
            return res
                .status(400)
                .send('Sort must be one of Action, Puzzle, Strategy, Casual, Arcade, or Card');
        }
        
    }

    let results = apps
        .filter(app =>
            app
                .App
                .toLowerCase()
                .includes(search.toLowerCase()));

    results = results
        .filter(app =>
            app
                .Genres
                .includes(genres));

    if (sort) {
        results.sort((a, b) => {
            return a[sort].toLowerCase() > b[sort].toLowerCase() ? 
                1 : a[sort].toLowerCase() < b[sort].toLowerCase() ? -1 : 0;
        });
    }

    res.json(results);
});

app.listen(8000, () => {
    console.log('Server started on PORT 8000');
});