import express, { Router } from 'express';
import { createComment, getPostComments, updateComment, deleteComment } from '../controllers/commentController';
import { authMiddleware } from "../middlewares/authMiddleware";

const router: Router = express.Router();

router.get("/:id", authMiddleware, getPostComments);
router.post("/", authMiddleware, createComment);
router.put('/:id', authMiddleware, updateComment);
router.delete("/:id", authMiddleware, deleteComment);

export default router;