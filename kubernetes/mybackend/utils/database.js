const { Pool } = require('pg');

const pgClient = new Pool({
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    host: process.env.POSTGRES_HOST,
    port: "5432"
});

pgClient.on('error', () => {
    console.log("Postgres not connected");
});

pgClient
.query('CREATE TABLE IF NOT EXISTS "telescopes" ("id" SERIAL PRIMARY KEY, "producer" varchar(255), "model" varchar(255), "price" DECIMAL(10, 2), "type" varchar(255), "type_of_build" varchar(255), "weight" DECIMAL(10, 2), "focal_length" DECIMAL(10, 2), "aperture" DECIMAL(10, 2), "aperture_ratio" DECIMAL(10, 2));')
.catch((err) => {
    console.log(err)
})

module.exports = pgClient;