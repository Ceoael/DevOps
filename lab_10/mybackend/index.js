const express = require('express');
const { v4: uuidv4 } = require('uuid');
const app = express();

const appId = uuidv4();

const appPort = 5000;

app.get('/hello', (req, res) => {
    res.send(`[${appId}] Hello from mybackend server`);
})

app.listen(appPort, () => { 
    console.log(`App listening on port ${appPort}`)
});
