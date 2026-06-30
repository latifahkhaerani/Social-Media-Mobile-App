require("dotenv").config();
const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const {
  typeDefs: postTypeDefs,
  resolvers: postResolvers,
} = require("./schemas/post");
const {
  typeDefs: userTypeDefs,
  resolvers: userResolvers,
} = require("./schemas/user");
const {
  typeDefs: followTypeDefs,
  resolvers: followResolvers,
} = require("./schemas/follow");

const server = new ApolloServer({
  typeDefs: [postTypeDefs, userTypeDefs, followTypeDefs],
  resolvers: [postResolvers, userResolvers, followResolvers],
});

async function startServer() {
  const { url } = await startStandaloneServer(server, {
    listen: { port: 3000 },
  });
  console.log(`🚀  Server ready at: ${url}`);
}

startServer();
