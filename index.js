'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const { validate, parse } = require('./url');
const { find, add } = require('./db');
const loggingMiddleware = require('./loggingMiddleware');
const Log = require('./log');

const app = express();
app.use(loggingMiddleware);
app.use(bodyParser.text({ type: '*/*' }));

app.get('/:id', async (req, res) => {
    try {
        const url = await find(req.params.id);
        if (url) {
            Log("backend", "info", "handler", `Redirecting id ${req.params.id} to ${url}`);
            res.redirect(url);
        } else {
            Log("backend", "warn", "handler", `No URL found for id ${req.params.id}`);
            res.sendStatus(404);
        }
    } catch (err) {
        Log("backend", "fatal", "db", "Critical database connection failure.");
        res.status(500).send('Database Error');
    }
});

app.post('/', async (req, res) => {
    const url = String(req.body);
    if (!validate(url)) {
        Log("backend", "error", "handler", "received string, expected bool");
        return res.status(400).send('Invalid URL');
    }
    try {
        const id = await add(parse(url));
        if (id) {
            Log("backend", "info", "handler", `Shortened URL created for ${url} with id ${id}`);
            res.set('Access-Control-Allow-Origin', '*');
            res.send(id);
        } else {
            Log("backend", "error", "handler", `Failed to add URL: ${url}`);
            res.status(500).send('Server Error');
        }
    } catch (err) {
        Log("backend", "fatal", "db", "Critical database connection failure.");
        res.status(500).send('Database Error');
    }
});

app.listen(4000, () => {
    Log("backend", "info", "server", 'Server listening on port 4000');
    console.log('Server listening on port 4000');
});