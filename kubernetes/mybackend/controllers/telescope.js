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
    const { producer, model, price, type, type_of_build, weight, focal_length, aperture, aperture_ratio } = req.body;

    pgClient.query('INSERT INTO telescopes (producer, model, price, type, type_of_build, weight, focal_length, aperture, aperture_ratio) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id;', [producer, model, price, type, type_of_build, weight, focal_length, aperture, aperture_ratio], (err, result)=>{
        if (err) {
            throw err;
        }
        const id = result.rows[0].id;

        redisClient.setex(id, 600, JSON.stringify([{id: id, ...req.body}]));
        res.status(201).json({
            message: 'Successfully added record to the database.',
            telescope: {id: result.rows[0].id, producer, model, price, type, type_of_build, weight, focal_length, aperture, aperture_ratio}
        });
    })
};

exports.deleteTelescope = (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        
        pgClient.query('DELETE FROM telescopes WHERE id = $1;', [id], (err, result) => {
            if (err) { 
                throw err;
            }

            console.log('DELETE ' + id);

            // REDIS DELETE RECORD
            redisClient.del(id, function(err, reply) {
                console.log(reply);
            })
            
            return res.status(200).send({
                error: false,
                message: `Deleted product with id: ${id}`
            })
        });
         
    } catch (error) {
        console.log(error);
    }
}

exports.putTelescope = (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        const { producer, model, price, type, type_of_build, weight, focal_length, aperture, aperture_ratio } = req.body;
        
        pgClient.query(`UPDATE telescopes SET producer = '${producer}', model = '${model}', price = ${price}, type = '${type}', type_of_build = '${type_of_build}', weight = ${weight}, focal_length = ${focal_length}, aperture = ${aperture}, aperture_ratio = ${aperture_ratio} WHERE id = ${id};`, (err, result) => {
            if (err) { 
                throw err;
            }

            // REDIS EDIT RECORD
            redisClient.setex(id, 600, JSON.stringify([{id: id, ...req.body}]));
            
            return res.status(200).send({
                error: false,
                message: `Updated product with id: ${id}`
            })
        });  
    } catch (error) {
        console.log(error);
    }
}
