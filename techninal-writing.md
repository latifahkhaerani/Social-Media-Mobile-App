# Technical Analysis: Redis Caching for GraphQL Posts

## Overview

In this project, I built a social media application with a React Native client and a GraphQL server. The server uses MongoDB as the primary database and Redis as a cache.

One of the challenges was deciding how to reduce repeated database queries when users request the list of posts. I implemented Redis caching for the `GetPost` query and cache invalidation when a new post is created.

## The Problem

The `GetPost` query retrieves posts from MongoDB. If multiple users repeatedly request the same list of posts, the server would query MongoDB every time.

The basic flow would be:

```text
Client
  ↓
GraphQL API
  ↓
MongoDB
  ↓
Response
```

For frequently requested data, this can result in unnecessary database queries.

## Caching Strategy

I added Redis between the GraphQL server and MongoDB.

The flow becomes:

```text
Client
  ↓
GraphQL API
  ↓
Redis
  ├── Cache exists → Return cached data
  │
  └── Cache miss
        ↓
      MongoDB
        ↓
    Store result in Redis
        ↓
      Response
```

When the `GetPost` query is executed, the server first checks whether the requested data already exists in Redis.

If the cache exists, the server can return the cached result without querying MongoDB.

If the cache does not exist, the server queries MongoDB, stores the result in Redis, and then returns the data to the client.

## Cache Invalidation

Caching introduces another problem: stale data.

For example, imagine the current posts are stored in Redis:

```text
Redis:
posts = [Post A, Post B]
```

Then a user creates a new post:

```text
Post C
```

If I only add Post C to MongoDB without clearing the cache, another `GetPost` request could still return:

```text
[Post A, Post B]
```

even though MongoDB contains Post C.

To prevent this, the `AddPost` mutation invalidates the cached posts after successfully creating a new post.

The flow becomes:

```text
AddPost
  ↓
MongoDB
  ↓
Post created successfully
  ↓
Invalidate posts cache
```

The next `GetPost` request will then query MongoDB again and create a fresh cache.

## Why I Chose This Approach

I chose this approach because the post list is read frequently compared to how often new posts are created.

Caching read-heavy data can reduce unnecessary database queries while keeping the implementation relatively simple.

The trade-off is that caching adds another layer that needs to be managed. In particular, the application needs to make sure that cached data is invalidated whenever the underlying data changes.

## What I Learned

The main thing I learned from implementing this feature is that improving performance is not simply about adding a cache.

The application also needs to consider data consistency.

A cache can make reads faster, but stale data can cause incorrect results if cache invalidation is not handled properly. This made me think more carefully about how mutations affect data that has already been cached.

This project helped me understand the relationship between the API layer, database, and caching layer, rather than treating each part of the application as an isolated feature.
