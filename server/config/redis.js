const Redis = require("ioredis");
const redis = new Redis("redis://default:ThcFk5tk2QVXPrAPb8Pemw8AHHjb7EjE@freestyle-soap-wilderness-78889.db.redis.io:19424");

module.exports = redis;
