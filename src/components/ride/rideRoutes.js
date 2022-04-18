import { Router } from 'express';
import { protect } from '../auth/authController.js';
import { createRide, getNearbyRides } from './rideController.js';

const router = Router();

router.post('/create-ride', createRide);

router.get('/nearby-rides/:distance/center/:latlng', protect, getNearbyRides);

export { router as rideRouter };
