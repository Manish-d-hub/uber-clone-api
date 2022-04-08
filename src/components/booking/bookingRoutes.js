import express from 'express';

import * as bookingController from './bookingController.js';
import * as authController from '../auth/authController.js';

const router = express.Router();

router
  .route('/book-ride')
  .post(authController.protect, bookingController.bookRide);

router
  .route('/my-bookings')
  .get(authController.protect, bookingController.getBookings);

export { router as bookingRouter };
