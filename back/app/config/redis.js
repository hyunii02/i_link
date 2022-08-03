const redis = require("redis");

require("dotenv").config();

// redis 연결
const url = `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`;
const redisClient = redis.createClient(
  {
    url,
    password: process.env.REDIS_PASS
  }
);

(async () => {
  await redisClient.connect();
})();

redisClient.on("ready", () => {
  console.log("Redis Client Ready");
});

redisClient.on("error", (err) => {
  console.log("Redis Client Error", err)
});

module.exports = redisClient