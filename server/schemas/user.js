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
  Mutation: {},
};

module.exports = { typeDefs, resolvers };
