import { logger } from '../../middleware/logger.js';
import { catchAsync } from '../../utils/catchAsync.js';
import ExpressError from '../../utils/ExpressError.js';
import Ride from '../ride/rideModel.js';
import Booking from './bookingModel.js';

export const bookOneRide = async (startLocation, destination, userId) => {
  logger.info('inside bookOneRide service');
  const radius = 5 / 6378.1;

  const [lng, lat] = startLocation.coordinates.map((el) => el);

  logger.info(lng);
  logger.info(lat);

  const ride = await Ride.find({
    isBooked: false,
    location: {
      $geoWithin: {
        $centerSphere: [[lng, lat], radius],
      },
    },
  });

  if (ride.length < 1) {
    throw new ExpressError('Uh oh! No rides nearby.', 401);
  }
  const nearestRide = ride[0].id;

  const bookedRide = await Booking.create({
    startLocation,
    destination,
    isConfrimed: true,
    ride: nearestRide,
    user: userId,
  });

  return bookedRide;
};

export const getUserBookings = async (userId) => {
  logger.info('inside getUserBookings service');
  const bookings = await Booking.find({ user: userId });

  if (bookings.length < 1)
    throw new ExpressError('You have not done any bookings yet!', 404);

  return bookings;
};
