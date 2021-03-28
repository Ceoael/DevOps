const { Pool } = require('pg');

const pgClient = new Pool({
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: "telescopes",
    host: "telescopesdb",
    port: "5432"
});

pgClient.on('error', () => {
    console.log("Postgres not connected");
});

pgClient
.query('CREATE TABLE IF NOT EXISTS telescopes (id SERIAL PRIMARY KEY, producer varchar(255), model varchar(255), price DECIMAL(10, 2));')
.catch((err) => {
    console.log(err)
})

module.exports = pgClient;