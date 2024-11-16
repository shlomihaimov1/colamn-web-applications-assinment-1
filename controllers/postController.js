const Post = require('../models/post');

const createPost = async (req, res) => {
    try {
        const post = new Post(req.body);
        const savedPost = await post.save();
        res.status(201).json(savedPost);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const getAllPosts = async (req, res) => {
    try {
        const { sender } = req.query;
        if (sender) {
            const posts = await Post.find({ senderId: sender });
            res.json(posts);
        } else {
            const posts = await Post.find();
            res.json(posts);
        }
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};


module.exports = {
  createPost,
  getAllPosts,
};
