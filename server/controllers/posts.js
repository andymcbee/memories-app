import PostMessage from "../models/postMessage.js";

//Get posts

export const getPosts = async (req, res) => {
  try {
    const postMessages = await PostMessage.find();
    console.log(postMessages);
    res.status(200).json(postMessages);
  } catch (err) {
    res.status(404).json({ message: error.message });
  }
};

//Create a post

export const createPost = async (req, res) => {
  const post = req.body;
  const newPost = new PostMessage(post);
  console.log();

  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (err) {
    res.status(409).json({ message: error.message });
  }
};
