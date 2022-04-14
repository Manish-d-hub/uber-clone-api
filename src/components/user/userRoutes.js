import { Router } from 'express';

import { loginUser, protect, signUp } from '../auth/authController.js';
import { getUsers, updateUser } from './userController.js';

const router = Router();

// USER ROUTES
router.post('/sign-up', signUp);
router.post('/login', loginUser);

// Use protect middleware for below routes
router.use(protect);

router.get('/', getUsers);
router.patch('/update-me', updateUser);

export { router as userRouter };
