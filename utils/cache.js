const redis = require("redis");

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

module.exports = redisClient;