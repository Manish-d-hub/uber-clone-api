import Ride from './rideModel.js';
import * as factory from './services/factoryController.js';

export const createRide = factory.createNewRide(Ride);

export const getNearbyRides = factory.getRides(Ride);
