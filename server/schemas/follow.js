const FollowModel = require("../models/FollowModel");

const typeDefs = `#graphql
  type Follow {
    _id: ID
    followingId: ID
    followerId: ID
    createdAt: String 
    updatedAt: String 
  }

  type Mutation {  
  follow(followingId: ID ): Follow 
  likePost(postId: ID, userId: ID): Post #belum
}
`;

const resolvers = {
  Mutation: {
    follow: async (_, { followingId }, { authentication }) => {
      const loginInfo = await authentication();

      //   console.log(loginInfo._id, "siapaa ya?");

      const newFollow = {
        followerId: loginInfo._id,
        followingId,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      return await FollowModel.create(newFollow);
    },
  },
};

module.exports = { resolvers, typeDefs };
