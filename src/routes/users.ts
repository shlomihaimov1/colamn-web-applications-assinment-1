import express, { Router } from 'express';
import { getAllUsers, getUserById, deleteUser } from '../controllers/usersController';
import { authMiddleware } from "../middlewares/authMiddleware";

const router: Router = express.Router();

router.get('/', authMiddleware, getAllUsers);

router.get('/:id', authMiddleware, getUserById);

router.delete('/:id', authMiddleware, deleteUser);

export default router;