const { ObjectId } = require("mongodb");
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
}
`;

const resolvers = {
  Mutation: {
    follow: async (_, { followingId }, { authentication }) => {
      const loginInfo = await authentication();

      //   console.log(loginInfo, "siapaa ya?");

      const newFollow = {
        followerId: loginInfo._id,
        followingId: new ObjectId(followingId),
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      // console.log(loginInfo._id, followingId);

      if (loginInfo._id.toString() === followingId) {
        throw new Error("Cannot follow yourself");
      }

      return await FollowModel.create(newFollow);
    },
  },
};

module.exports = { resolvers, typeDefs };
