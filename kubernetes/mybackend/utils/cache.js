const redis = require("redis");

const redisClient = redis.createClient({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    // retry_strategy: () => 1000
});

redisClient.on('connect', () => {
    console.log("Connected to redis.");
});

redisClient.on('error', (error) => {
    console.log(error);
});

module.exports = redisClient;