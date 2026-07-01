const { ObjectId } = require("mongodb");
const { database } = require("../config/mongodb");
const { hashSync } = require("bcryptjs");

class UserModel {
  static collection() {
    return database.collection("Users");
  }

  static async create(newUser) {
    /* 
            1. validasi:
                a. email required, email format
                b. email dan username unik
            2. hash password
            3. simpan
        */

    if (!newUser.email) {
      throw new Error("Email is required");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newUser.email)) {
      throw new Error("Invalid email format");
    }

    if (!newUser.password) {
      throw new Error("Password is required");
    }

    if (!newUser.username) {
      throw new Error("Username is required");
    }

    const existingUser = await this.collection().findOne({
      $or: [{ email: newUser.email }, { username: newUser.username }],
    });

    if (existingUser) {
      throw new Error("Email or username already exists");
    }

    newUser.password = hashSync(newUser.password, 10);

    await this.collection().insertOne(newUser);
    return newUser;
  }

  //untuk login
  static async findByEmail(email) {
    return await this.collection().findOne({ email });
  }

  //   get all user
  static async findUsers() {
    return await this.collection().find().toArray();
  }

  //  search: find by name/username
  static async findByName(name = "", username = "") {
    const agg = [
      {
        $match: {
          $or: [
            {
              name: {
                $regex: name,
                $options: "i",
              },
            },
            {
              username: {
                $regex: username,
                $options: "i",
              },
            },
          ],
        },
      },
    ];
    return await this.collection().aggregate(agg).toArray();
  }

  //   get user by id
  static async findById(_id) {
    const agg = [
      {
        $match: {
          _id: new ObjectId(_id),
        },
      },
      {
        $lookup: {
          from: "Follows",
          localField: "_id",
          foreignField: "followerId",
          as: "following",
        },
      },
      {
        $lookup: {
          from: "Follows",
          localField: "_id",
          foreignField: "followingId",
          as: "follower",
        },
      },
      {
        $lookup: {
          from: "Users",
          localField: "following.followingId",
          foreignField: "_id",
          as: "following",
        },
      },
      {
        $lookup: {
          from: "Users",
          localField: "follower.followerId",
          foreignField: "_id",
          as: "follower",
        },
      },
    ];

    const result =  await this.collection().aggregate(agg).toArray();
    console.log(result)
    return result[0]
  }
}

module.exports = UserModel;
