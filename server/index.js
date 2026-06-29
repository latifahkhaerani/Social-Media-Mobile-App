const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
// const { database } = require("../../1.server/config/mongodb");
const { database } = require("./config/mongodb");

// data
const books = [
  {
    title: "The Awakening",
    author: "Kate Chopin",
  },
  {
    title: "City of Glass",
    author: "Paul Auster",
  },
];
const users = [
  {
    _id: "1",
    name: "lala",
    username: "lala",
    email: "lala@gmail.com",
    password: "12345",
  },
  {
    _id: "2",
    name: "Farhan",
    username: "farhan",
    email: "farhan@gmail.com",
    password: "12345",
  },
  {
    _id: "3",
    name: "Dinda",
    username: "dinda",
    email: "dinda@gmail.com",
    password: "12345",
  },
];

const posts = [
  {
    _id: "1",
    content: "Belajar GraphQL seru juga 🚀",
    tags: ["graphql", "backend"],
    imgUrl: "https://picsum.photos/400/300?1",
    authorId: "1",
    comments: [
      {
        _id: "1",
        content: "Mantap!",
        username: "farhan",
      },
      {
        _id: "2",
        content: "Semangat belajarnya!",
        username: "dinda",
      },
    ],
    likes: [
      {
        _id: "1",
        username: "farhan",
      },
      {
        _id: "2",
        username: "dinda",
      },
    ],
    createdAt: "2026-06-29T08:00:00.000Z",
    updatedAt: "2026-06-29T08:00:00.000Z",
  },
  {
    _id: "2",
    content: "Hari ini belajar Apollo Server.",
    tags: ["apollo", "graphql"],
    imgUrl: "https://picsum.photos/400/300?2",
    authorId: "2",
    comments: [],
    likes: [
      {
        _id: "3",
        username: "willia",
      },
    ],
    createdAt: "2026-06-29T10:30:00.000Z",
    updatedAt: "2026-06-29T10:30:00.000Z",
  },
];

const follows = [
  {
    _id: "1",
    followerId: "1",
    followingId: "2",
    createdAt: "2026-06-29T09:00:00.000Z",
    updatedAt: "2026-06-29T09:00:00.000Z",
  },
  {
    _id: "2",
    followerId: "1",
    followingId: "3",
    createdAt: "2026-06-29T09:05:00.000Z",
    updatedAt: "2026-06-29T09:05:00.000Z",
  },
];

// type

const typeDefs = `#graphql
  # This "Book" type defines the queryable fields for every book in our data source.
  type Book {
    title: String
    author: String
  }

  type User {
    _id: ID
    name: String
    username: String
    email: String
    password: String
  }

  type Post {
    _id: ID
    content: String
    tags: [String]
    imgUrl: String
    authorId: Int 
    comments: [String] 
    likes: [String] 
    createdAt: String 
    updatedAt: String 
  }

  type Follow {
    _id: ID
    followingId: Int
    followerId: Int
    createdAt: String 
    updatedAt: String 
  }

  type Query {
    books: [Book]
    getPosts: [Post]
    getPostsById: [Post] 
    searchUser: [User] 
    getUser: [User]
  }

  type Mutation {
  register(name: String, username: String, email: String, password: String): User
  login(email: String, password: String): User
  addPost(_id: ID,content: String,tags: [String],imgUrl: String,authorId: Int ,comments: [String],likes: [String],createdAt: String ,updatedAt: String): Post 
  commentPost(_id: ID,content: String,tags: [String],imgUrl: String,authorId: Int ,comments: [String],likes: [String],createdAt: String ,updatedAt: String): Post 
  follow(_id: ID,followingId: Int,followerId: Int,createdAt: String ,updatedAt: String ): Follow 
  likePost(postId: Int, userId: Int): Post #belum
}
`;

const resolvers = {
  Query: {
    books: () => books,
    getPosts: async () => {
      const post = await database.collection("post");
      return posts;
    },
    getUser: () => users,
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
    ) => {
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
      const result = (await database.collection("Posts")).insertOne(newPost);

      return {
        ...newPost,
      };
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests

async function startServer() {
  try {
    const { url } = await startStandaloneServer(server, {
      listen: { port: 3000 },
    });
    console.log(`🚀  Server ready at: ${url}`);
  } catch (error) {
    console.log(error);
  }
}

startServer();
