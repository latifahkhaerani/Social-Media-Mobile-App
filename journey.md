# Development Journey

## Day 1

### Project Setup: Application Theme, Apollo Server, and GraphQL

Set up the server application with the following requirements:

* [x] Install MongoDB locally or use MongoDB Atlas
* [x] Install the required packages: `@apollo/server`, `graphql`, and `mongodb` as the MongoDB driver
* [x] Define the application theme and document it in the GitHub README
* [x] Create a GraphQL server using Apollo Server with the default port `3000`

### GraphQL - Apollo Server

Build a GraphQL server using Apollo Server with the following queries and mutations:

* [x] Register (Mutation)
* [x] Login (Query)
* [x] Get Posts (Query)
* [x] Add Post (Mutation)
* [x] Comment on Post (Mutation)
* [x] Search Users (Query)
* [x] Follow User (Mutation)
* [x] Get User (Query)
* [x] Like Post (Mutation)

### MongoDB 1

Implement functions and methods to connect the GraphQL server to MongoDB:

* [x] Add User — used during registration
* [x] Get User by Username and Password — used during login
* [x] Search Users by Name or Username
* [x] Follow User
* [x] Get User by ID — used to display a user profile
* [x] Add Post
* [x] Get Posts — retrieve posts sorted by the latest
* [x] Get Post by ID
* [x] Comment on Post
* [x] Like Post

---

## Day 2

### MongoDB 2

Implement MongoDB lookups and relationships for the existing database functions.

#### Get Post by ID

* [x] Display the commenter's name or username within each comment

#### Get User by ID

* [x] Display the user's profile
* [x] Display the names or usernames of the user's followers
* [x] Display the names or usernames of the user's following

### Redis - Caching

Implement Redis caching in the GraphQL server:

* [x] Cache the `Get Posts` query
* [x] Invalidate the cache when a new post is added through the `Add Post` mutation

---

## Day 3

### React Native

Build the mobile client for the My Social Media App using React Native and Expo.

#### Unauthenticated Screens

* [x] Login Screen — display a login form
* [x] Register Screen — display a registration form

#### Authenticated Screens

* [x] Home Screen — display the latest posts
* [x] Create Post Screen — provide a form for creating a new post
* [x] Post Detail Screen — display post details and provide a comment form
* [x] Search Screen — provide a form for searching users
* [x] Profile Screen — display a user's profile, followers, and following counts

### React Navigation

* [x] Implement navigation between the application's screens using React Navigation

---

## Day 4

### GraphQL - Apollo Client

Connect the React Native mobile client to the GraphQL server using Apollo Client and implement the required queries and mutations.

* [x] Register (Mutation)
* [x] Login (Query)
* [x] Get Posts (Query)
* [x] Add Post (Mutation)
* [x] Comment on Post (Mutation)
* [x] Search Users (Query)
* [x] Follow User (Mutation)
* [x] Get User (Query)
* [x] Like Post (Mutation)
