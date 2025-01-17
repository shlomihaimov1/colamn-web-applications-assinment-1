import express, { Router } from 'express';
import { createComment, getPostComments, updateComment, deleteComment } from '../controllers/commentController';

const router: Router = express.Router();

router.get("/:id", getPostComments);
router.post("/", createComment);
router.put('/:id', updateComment);
router.delete("/:id", deleteComment);

export default router;