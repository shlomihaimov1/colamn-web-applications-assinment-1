const Comment = require('../models/comment');

const createComment = async (req, res) => {
  try {
      const comment = new Comment(req.body);
      const savedComment = await comment.save();
      res.status(201).json(savedComment);
  } catch (err) {
      res.status(400).json({ message: err.message });
  }
};

const getPostComments = async (req, res) => {
  try {
      const comments = await Comment.find({ postId: req.params.postId });
      res.json(comments);
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
};

const updateComment = async (req, res) => {
  try {
      const comment = await Comment.findByIdAndUpdate(
          req.params.id,
          req.body,
          { new: true }
      );
      if (!comment) return res.status(404).json({ message: 'Comment not found' });
      res.json(comment);
  } catch (err) {
      res.status(400).json({ message: err.message });
  }
};

const deleteComment = async (req, res) => {
  try {
      const comment = await Comment.findByIdAndDelete(req.params.id);
      if (!comment) return res.status(404).json({ message: 'Comment not found' });
      res.json({ message: 'Comment deleted' });
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createComment,
  getPostComments,
  updateComment,
  deleteComment
};