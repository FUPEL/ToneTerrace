import express from 'express';
import * as AuthController from '../controllers/auth.js'
import { protect } from '../middlewares/auth.js';

const router = express.Router();

router.post('/login', AuthController.login);
router.post('/register', AuthController.register);
router.get('/me', protect, AuthController.me);

export default router;
