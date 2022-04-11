import express from 'express';

import * as rideController from './rideController.js';
import * as authController from '../auth/authController.js';

const router = express.Router();

router.route('/create-ride').post(rideController.createRide);

router
  .route('/nearby-rides/:distance/center/:latlng')
  .get(authController.protect, rideController.getNearbyRides);

export { router as rideRouter };
