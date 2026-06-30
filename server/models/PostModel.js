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
  }
}

module.exports = PostModel;
