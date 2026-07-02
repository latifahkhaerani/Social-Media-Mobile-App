const { database } = require("../config/mongodb");

class FollowModel {
  static collection() {
    return database.collection("Follows");
  }

  static async create(newFollow) {
    
    const result = await this.collection().insertOne(newFollow);
    // console.log(result, "result");
    newFollow._id = result.insertedId;

    return newFollow;
  }
}

module.exports = FollowModel;
