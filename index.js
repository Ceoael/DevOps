require('dotenv').config()

const express = require("express");
const cors = require("cors");
const redis = require("redis");
const { Pool } = require('pg');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


const redisClient = redis.createClient({
    host: "myredis",
    port: 6379,
    // retry_strategy: () => 1000
});

redisClient.on('connect', () => {
    console.log("Connected to redis server.");
});

redisClient.on('error', (error) => {
    console.log(error);
});

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

app.get('/', (req, res) => {
    res.send("Telescopes server is ready!");
});

app.get('/telescopes', (req, res) => {
    pgClient.query('SELECT * FROM telescopes ORDER BY id ASC', (err, result) => {
        if (err) { 
            throw error
        }
        res.status(200).json(result.rows);
    })
});

app.get('/telescope/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id);

        redisClient.get(id, async (error, result) => {
            if (result) {
                return res.status(200).send({
                    error: false,
                    message: `Result for ${id} from the cache`,
                    data: JSON.parse(result)
                })
            } else {
                pgClient.query('SELECT * FROM telescopes WHERE id = $1;', [id], (err, result) => {
                    if (err) { 
                        throw err;
                    }
            
                    const rows = JSON.stringify(result.rows);
                    console.log(`id: ${id}, data: ${rows}`);
            
                    redisClient.setex(id, 600, rows);
                    return res.status(200).send({
                        error: false,
                        message: `Result for ${id} from the server`,
                        data: JSON.parse(rows)
                    })
                });
            }
        });
    } catch (error) {
        console.log(error);
    }
});

app.post('/telescopes', (req, res) => {
    console.log("Hello 1");
    const { producer, model, price } = req.body;
    console.log(`${req.body.producer} ${model} ${price}`);

    pgClient.query('INSERT INTO telescopes (producer, model, price) VALUES ($1, $2, $3) RETURNING id;', [producer, model, price], (err, result)=>{
        if (err) {
            throw err;
        }
        const id = result.rows[0].id;

        redisClient.setex(id, 600, JSON.stringify([{id: id, ...req.body}]));
        res.status(201).json({
            message: 'Successfully added record to database.',
            telescope: {id: result.rows[0].id, producer: producer, model: model, price: price}
        });
    })
});

const PORT = 9090;

app.listen(PORT, () => {
    console.log(`API listening on port ${PORT}`);
});
