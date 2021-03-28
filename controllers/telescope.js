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

exports.getTelescope = (req, res, next) => {
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
}

exports.postTelescope = (req, res, next) => {
    const { producer, model, price } = req.body;

    pgClient.query('INSERT INTO telescopes (producer, model, price) VALUES ($1, $2, $3) RETURNING id;', [producer, model, price], (err, result)=>{
        if (err) {
            throw err;
        }
        const id = result.rows[0].id;

        redisClient.setex(id, 600, JSON.stringify([{id: id, ...req.body}]));
        res.status(201).json({
            message: 'Successfully added record to the database.',
            telescope: {id: result.rows[0].id, producer: producer, model: model, price: price}
        });
    })
};
