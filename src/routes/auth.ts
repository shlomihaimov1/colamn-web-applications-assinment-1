import express, { Router } from 'express';
import { register, login, refresh, logout } from "../controllers/authController";

const router: Router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.post("/refresh", refresh);

export default router;