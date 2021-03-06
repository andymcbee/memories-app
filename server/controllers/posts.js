import express from "express";
import mongoose from "mongoose";

import PostMessage from "../models/postMessage.js";

//Get posts

export const getPosts = async (req, res) => {
  const { page } = req.query;
  try {
    //how many results to return per page
    const LIMIT = 8;
    //Find the first index value for current page.
    // -1 is to get to zero (Eg. page 1 = zero index. not 1 index.)
    const startIndex = (Number(page) - 1) * LIMIT;
    //find total number of posts so we can show proper pagination numbers.
    const total = await PostMessage.countDocuments({});
    //sort by oldest to newest: .sort({_id: -1})
    // limit number of returned results: .limit(LIMIT)
    //Skip all posts and start at the current startIndex: .skip(startIndex)
    const posts = await PostMessage.find()
      .sort({ _id: -1 })
      .limit(LIMIT)
      .skip(startIndex);
    res.status(200).json({
      data: posts,
      currentPage: Number(page),
      numberOfPages: Math.ceil(total / LIMIT),
    });
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

export const getPostsBySearch = async (req, res) => {
  const { searchQuery, tags } = req.query;
  console.log(req.query);

  try {
    const title = new RegExp(searchQuery, "i");
    console.log(title);

    const posts = await PostMessage.find({
      $or: [{ title }, { tags: { $in: tags.split(",") } }],
    });
    console.log(posts);

    res.json({ data: posts });
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

//Create a post

export const createPost = async (req, res) => {
  const post = req.body;
  const newPost = new PostMessage({
    ...post,
    creator: req.userId,
    createdAt: new Date().toISOString(),
  });
  console.log();

  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error });
  }
};

//Update a post

export const updatePost = async (req, res) => {
  const { id: _id } = req.params;
  const post = req.body;
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("No post with that id");
  }

  try {
    const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, {
      new: true,
    });

    res.json(updatedPost);
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = async (req, res) => {
  const { id: _id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("No post with that id");
  }
  try {
    await PostMessage.findByIdAndRemove(_id);
    res.json({ message: "Post has been deleted." });
  } catch (error) {
    console.log(error);
  }
};

export const likePost = async (req, res) => {
  const { id: _id } = req.params;

  if (!req.userId) return res.json({ message: "Unauthenticated" });

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("No post with that id");
  }
  try {
    const post = await PostMessage.findById(_id);

    const index = post.likes.findIndex((id) => id === String(req.userId));

    if (index === -1) {
      //like post
      post.likes.push(req.userId);
    } else {
      //unlike post
      post.likes = post.likes.filter((id) => id !== String(req.userId));
    }

    const updatedPost = await PostMessage.findByIdAndUpdate(
      _id,
      {
        post,
      },
      {
        new: true,
      }
    );
    res.json(updatedPost);
  } catch (error) {
    console.log(error);
  }
};
