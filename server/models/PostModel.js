const { database } = require("../config/mongodb.js");

class PostModel {
  static collection() {
    return database.collection("Posts");
  }

  static async getAll() {
    const post = await this.collection().find().toArray();
    return post;
  }

  static async create(newPost) {
    await this.collection().insertOne(newPost);
    return newPost;
  }

//   static async getById(_id) {
//     const post = await this.collection().findOne({
//       _id,
//     });
//     return post;
//   }
}

module.exports = PostModel;
