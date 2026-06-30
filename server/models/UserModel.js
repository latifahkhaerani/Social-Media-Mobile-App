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
                b. password length min 6
                c. username length min 3
                d. email dan username unik
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
}

module.exports = UserModel;
