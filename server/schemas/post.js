const FollowModel = require("../models/FollowModel");
const PostModel = require("../models/PostModel");

const typeDefs = `#graphql
    type Comments {
    content: String
    username: String
    createdAt: String 
    updatedAt: String 
    }

    type Likes {
    username: String
    createdAt: String 
    updatedAt: String 
    }

    type Post {
    _id: ID
    content: String
    tags: [String]
    imgUrl: String
    authorId: ID 
    comments: [Comments] 
    likes: [Likes] 
    createdAt: String 
    updatedAt: String 
  }
  
  type Query {
    getPosts: [Post]
    getPostById(_id: ID): Post
  }

  type Mutation {
    addPost(content: String,tags: [String],imgUrl: String): Post 
    commentPost(postId: ID, content: String): Post 
    likePost(postId: ID): Likes
  }
`;

const resolvers = {
  Query: {
    getPosts: async () => {
      const posts = await PostModel.getAll();
      return posts;
    },
    getPostById: async (_, { _id }) => {
      return await PostModel.getById(_id);
    },
  },
  Mutation: {
    addPost: async (_, { content, tags, imgUrl }, { authentication }) => {
      const loginInfo = await authentication();

      const newPost = {
        content,
        tags,
        imgUrl,
        authorId: loginInfo._id,
        comments: [],
        likes: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      await PostModel.create(newPost);
      return newPost;
    },

    commentPost: async (_, { postId, content }, { authentication }) => {
      const loginInfo = await authentication();

      const newComment = {
        content,
        username: loginInfo.username,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      return await PostModel.comment(postId, newComment);
    },

    likePost: async (_, { postId }, { authentication }) => {
      const loginInfo = await authentication();

      const newLike = {
        username: loginInfo.username,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      return await PostModel.like(postId, newLike);
    },
  },
};

module.exports = { resolvers, typeDefs };
