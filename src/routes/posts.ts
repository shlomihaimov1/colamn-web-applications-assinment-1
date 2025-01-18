import express, { Router } from 'express';
import { createPost, getAllPosts, getPostById, deletePost, updatePost } from '../controllers/postController';
import { authMiddleware } from "../middlewares/authMiddleware";

const router: Router = express.Router();

router.get("/", authMiddleware, getAllPosts);
router.get("/:id", authMiddleware, getPostById);
router.post("/", authMiddleware, createPost);
router.put('/:id', authMiddleware, updatePost);
router.delete("/:id", authMiddleware, deletePost);

export default router;