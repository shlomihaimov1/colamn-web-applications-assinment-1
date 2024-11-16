const express = require('express');
const router = express.Router();
const { createPost, getAllPosts, getPostById, updatePost } = require('../controllers/postController');

router.post('/', createPost);
router.get('/', getAllPosts);
router.get('/:id', getPostById);
router.put('/:id', updatePost);

module.exports = router;