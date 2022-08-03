const redis = require("redis");

require("dotenv").config();

// redis 연결
const redisClient = redis.createClient(process.env.REDIS_PORT, process.env.DB_HOST);

(async () => {
  await redisClient.connect();
})();

redisClient.on("connect", () => {
  console.log("Redis Client 연결됨");
});
redisClient.on("error", (err) => {
  console.log("Redis Client Error", err)
});

module.exports = redisClient