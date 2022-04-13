import { Router } from 'express';

import { protect } from '../auth/authController.js';
import { bookRide, getBookings } from './bookingController.js';

const router = Router();

router.use(protect);

router.post('/book-ride', bookRide);

router.get('/my-bookings', getBookings);

export { router as bookingRouter };
