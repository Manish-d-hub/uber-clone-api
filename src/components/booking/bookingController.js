import Ride from '../ride/rideModel.js';
import Booking from './bookingModel.js';
import { bookOne, getAll } from './services/factoryController.js';

export const bookRide = bookOne(Ride, Booking);

export const getBookings = getAll(Booking);
