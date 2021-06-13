require('dotenv').config()

const express = require("express");
const cors = require("cors");

const telescopeRoutes = require('./routes/telescope');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/telescopes', telescopeRoutes);

app.get('/', (req, res) => {
    res.send("Telescopes server is ready!");
});

const PORT = 4000;

app.listen(PORT, () => {
    console.log(`API listening on port ${PORT}`);
});
