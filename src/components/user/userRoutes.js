import { Router } from 'express';

import { loginUser, protect, signUp } from '../auth/authController.js';
import { getUsers, updateUser } from './userController.js';

const router = Router();

// USER ROUTES
router.route('/').get(protect, getUsers);
router.route('/update-me').patch(protect, updateUser);

router.route('/sign-up').post(signUp);
router.route('/login').post(loginUser);

export { router as userRouter };
