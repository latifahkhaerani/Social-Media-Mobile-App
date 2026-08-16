# My Social Media App

A mobile social media application built with **React Native** and **GraphQL**. The application follows a client-server architecture, with a GraphQL API handling authentication, posts, comments, likes, and user relationships.

This project was built as part of my mobile application development journey and helped me understand how a mobile client communicates with a backend service and database.

## Tech Stack

### Client

* React Native
* Expo
* Apollo Client
* React Navigation

### Server

* Node.js
* Apollo Server
* GraphQL
* MongoDB
* Redis

## Features

### Authentication

* User registration
* User login

### Posts

* Create a new post
* View the latest posts
* View post details
* Comment on posts
* Like posts
* Display total likes

### Users

* Search users by name or username
* View user profiles
* Follow users
* View followers
* View following

### Data & Performance

* MongoDB for persistent data storage
* MongoDB `$lookup` for relationships between users and followers/following
* Redis caching for the post feed
* Cache invalidation when a new post is created

## Project Structure

```text
.
├── app/
│   └── React Native mobile application
│
└── server/
    └── GraphQL API server
```

The `app` directory contains the React Native client, while the `server` directory contains the GraphQL API and database logic.

## Architecture

The application uses a client-server architecture:

```text
React Native
     │
     ▼
Apollo Client
     │
     ▼
GraphQL API
     │
     ├──────────────┐
     ▼              ▼
   Redis         MongoDB
   Cache        Persistent Data
```

The React Native application communicates with the backend through GraphQL queries and mutations.

Redis is used as a cache layer for frequently requested post data, while MongoDB remains the primary persistent data store.

## Technical Writing

I also documented one of the technical decisions from this project in more detail:

**[Redis Caching in a GraphQL Social Media App](./technical-writing.md)**

The document explains the caching approach, cache invalidation strategy, and what I learned from implementing it.

## What I Learned

This project helped me develop a better understanding of full application architecture and how different layers communicate.

Some of the key areas I worked with include:

* Designing GraphQL queries and mutations
* Connecting a React Native client to a GraphQL API
* Working with MongoDB documents and relationships
* Implementing authentication
* Handling user relationships such as followers and following
* Using Redis for caching
* Debugging issues across the client, API, and database layers

More importantly, the project taught me to think beyond individual features and understand how changes in one part of an application can affect the rest of the system.
