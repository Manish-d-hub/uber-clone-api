import { Router } from 'express';

import { loginUser, protect, signUp } from '../auth/authController.js';
import { getUsers, updateUser } from './userController.js';

const router = Router();

// USER ROUTES
router.route('/sign-up').post(signUp);
router.route('/login').post(loginUser);

// Use protect middleware for below routes
router.use(protect);

router.get('/', getUsers);
router.patch('/update-me', updateUser);

export { router as userRouter };
