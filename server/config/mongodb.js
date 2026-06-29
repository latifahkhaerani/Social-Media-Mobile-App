// mongo

const { MongoClient, ServerApiVersion } = require("mongodb");
const uri =
  "mongodb+srv://lala_db_user:ivCG27qZjVFWZA0F@gc1.1pkev8e.mongodb.net/?appName=GC1";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version

// async function run() {
//   try {
//     await client.db("Posts").command({ ping: 1 });
//     console.log(
//       "Pinged your deployment. You successfully connected to MongoDB!",
//     );
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }

const client = new MongoClient(uri);
const database = client.db("hck-96");
// run().catch(console.dir);

module.exports = { database };
