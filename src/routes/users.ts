import express, { Router } from 'express';
import { getAllUsers, getUserById, deleteUser } from '../controllers/usersController';

const router: Router = express.Router();

router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.delete('/:id', deleteUser);

export default router;