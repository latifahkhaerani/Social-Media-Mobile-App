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
    addPost(_id: ID,content: String,tags: [String],imgUrl: String,authorId: ID,createdAt: String ,updatedAt: String): Post 
    # commentPost(): Post 
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
    addPost: async (
      _,
      {
        _id,
        content,
        tags,
        imgUrl,
        authorId,
        comments,
        likes,
        createdAt,
        updatedAt,
      },
      { authentication },
    ) => {
      await authentication();
      const newPost = {
        _id,
        content,
        tags,
        imgUrl,
        authorId,
        comments,
        likes,
        createdAt,
        updatedAt,
      };
      await PostModel.create(newPost);
      return newPost;
    },
  },
};

module.exports = { resolvers, typeDefs };
