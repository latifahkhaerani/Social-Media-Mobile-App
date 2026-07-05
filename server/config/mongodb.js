const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri);
const database = client.db("hck-96");

module.exports = { database };
