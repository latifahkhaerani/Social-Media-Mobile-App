const { ObjectId } = require("mongodb");
const { database } = require("../config/mongodb.js");

class PostModel {
  static collection() {
    return database.collection("Posts");
  }

  static async getAll() {
    const agg = [
      {
        $lookup: {
          from: "Users",
          localField: "authorId",
          foreignField: "_id",
          as: "author",
        },
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
    ];

    const post = await this.collection().aggregate(agg).toArray();

    return post;
  }

  static async create(newPost) {
    await this.collection().insertOne(newPost);
    return newPost;
  }

  static async getById(_id) {
    const agg = [
      {
        $match: {
          _id: new ObjectId(_id),
        },
      },
      {
        $lookup: {
          from: "Users",
          localField: "authorId",
          foreignField: "_id",
          as: "author",
        },
      },
    ];

    const post = await this.collection().aggregate(agg).toArray();

    return post[0];
  }

  static async comment(postId, newComment) {
    await this.collection().findOneAndUpdate(
      {
        _id: new ObjectId(postId),
      },
      {
        $push: {
          comments: newComment,
        },
      },
    );

    return newComment;
  }

  static async like(postId, newLike) {
    // 1. Cari dulu postnya
    const post = await this.collection().findOne({
      _id: new ObjectId(postId),
    });

    // jika tidak ada post
    if (!post) {
      throw new Error("Post not found");
    }

    // console.log(post.likes, "isi post apa");
    const alreadyLiked = post.likes.some((like) => {
      console.log(like);
      return like.username === newLike.username;
    });

    if (alreadyLiked) {
      throw new Error("You already liked this post");
    }

    await this.collection().findOneAndUpdate(
      {
        _id: new ObjectId(postId),
      },
      {
        $push: {
          likes: newLike,
        },
      },
    );

    return newLike;
  }
}

module.exports = PostModel;
