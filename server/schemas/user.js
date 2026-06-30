const UserModel = require("../models/UserModel");

const typeDefs = `#graphql
type User {
    _id: ID
    name: String
    username: String
    email: String
    password: String
  }

    type Query {
        searchUser: [User] 
        getUser: [User]
    }

    type Mutation {
    register(name: String, username: String, email: String, password: String): User
    
    login(email: String, password: String): User
    }
`;

const resolvers = {
  Query: {
    getUser: () => users,
  },
  Mutation: {
    register: async (_, { name, username, email, password }) => {
      const newUser = await { name, username, email, password };

      await UserModel.create(newUser);
      return newUser;
    },
  },
};

module.exports = { typeDefs, resolvers };
