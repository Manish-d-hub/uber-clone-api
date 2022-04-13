import { Router } from 'express';

import { protect } from '../auth/authController.js';
import { bookRide, getBookings } from './bookingController.js';

const router = Router();

router.route('/book-ride').post(protect, bookRide);

router.route('/my-bookings').get(protect, getBookings);

export { router as bookingRouter };
