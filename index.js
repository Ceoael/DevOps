const express = require("express");

const app = express();

app.get('/hello', (req, res) => {
    res.send("Teleskopy server");
});

const PORT = 9090;

app.listen(PORT, () => {
    console.log(`API listening on port ${PORT}`);
});
