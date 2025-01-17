import express, { Router } from 'express';
import { createPost, getAllPosts, getPostById, deletePost, updatePost } from '../controllers/postController';

const router: Router = express.Router();

router.get("/", getAllPosts);
router.get("/:id", getPostById);
router.post("/", createPost);
router.put('/:id', updatePost);
router.delete("/:id", deletePost);

export default router;