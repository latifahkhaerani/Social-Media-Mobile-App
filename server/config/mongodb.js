const { MongoClient, ServerApiVersion } = require("mongodb");
const uri =
  "mongodb+srv://lala_db_user:ivCG27qZjVFWZA0F@gc1.1pkev8e.mongodb.net/?appName=GC1";

const client = new MongoClient(uri);
const database = client.db("hck-96");


module.exports = { database };
