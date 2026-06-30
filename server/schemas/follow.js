const typeDefs = `#graphql
  type Follow {
    _id: ID
    followingId: ID
    followerId: ID
    createdAt: String 
    updatedAt: String 
  }

  type Mutation {  
  follow(_id: ID,followingId: ID,followerId: ID,createdAt: String ,updatedAt: String ): Follow 
  likePost(postId: ID, userId: ID): Post #belum
}
`;

const resolvers = {};

module.exports = { resolvers, typeDefs };
