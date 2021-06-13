const express = require('express');

const { v4: uuidv4 } = require('uuid');

const app = express();

const appId = uuidv4();

const appPort = 7000;
const postgresPort = 5432;

const pgClient = require('../utils/database');
const redisClient = require('../utils/cache');


exports.getTelescopes = (req, res, next) => {
    pgClient.query('SELECT * FROM telescopes ORDER BY id ASC', (err, result) => {
        if (err) { 
            throw error
        }
        res.status(200).json({ 
            error: false, 
            message:  'Result for all products from the server.',
            data: result.rows
        });
    })
}


app.get('/api', (req, res) => {
    res.send(`[${appId}] Hello from mybackend server`);
})

app.listen(appPort, () => { 
    console.log(`App listening on port ${appPort}`)
});
