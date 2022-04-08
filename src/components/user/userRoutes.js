import express from 'express';

import * as userController from './userController.js';
import * as authController from '../auth/authController.js';

const router = express.Router();

// USER ROUTES
router.route('/').get(authController.protect, userController.getUsers);

router.route('/sign-up').post(authController.signUp);
router.route('/login').post(authController.loginUser);
router
  .route('/my-bookings')
  .get(authController.protect, userController.myBookings);

export { router as userRouter };
