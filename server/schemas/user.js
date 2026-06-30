const UserModel = require("../models/UserModel");
const { compareSync } = require("bcryptjs");
const { sign } = require("jsonwebtoken");

const typeDefs = `#graphql
type User {
    _id: ID
    name: String
    username: String
    email: String
    # password: String #hide password
  }

  type LoginResponse {
    message: String
    token: String
  }

    type Query {
    searchUser(name: String, username:String): [User] 
    getUser: [User]
    getUserById(_id: ID): User
    }

    type Mutation {
    register(name: String, username: String, email: String, password: String): User
    
    login(email: String, password: String): LoginResponse
    }
`;

const resolvers = {
  Query: {
    getUser: async () => {
      return await UserModel.findUsers();
    },

    searchUser: async (_, { name, username }) => {
      const filteredUser = await UserModel.findByName(name, username);

      return filteredUser;
    },

    getUserById: async (_, { _id }) => {
      return await UserModel.findById(_id);
    },
  },
  Mutation: {
    register: async (_, { name, username, email, password }) => {
      const newUser = await { name, username, email, password };

      await UserModel.create(newUser);
      return newUser;
    },
    login: async (_, { email, password }) => {
      /* 
        1. search user by email(di model), jika tidak ada error
        2. bandingkan password (compareSync), kalau salah error
        3. create token, jsonwebtoken
        4. return token
        */
      const user = await UserModel.findByEmail(email);
      if (!user) {
        throw new Error("Invalid email or password");
      }

      const isPassValid = compareSync(password, user.password);

      if (isPassValid) {
        throw new Error("Invalid email or password");
      }
      //   console.log(process.env.JWT_SECRET);
      //   3. create token
      const token = sign(
        {
          _id: user._id,
          username: user.username,
          email: user.email,
        },
        process.env.JWT_SECRET,
      );
      return {
        message: "Login success!",
        token,
      };
    },
  },
};

module.exports = { typeDefs, resolvers };
