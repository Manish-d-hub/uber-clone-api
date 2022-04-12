import { logger } from '../../middleware/logger.js';
import { catchAsync } from '../../utils/catchAsync.js';
import ExpressError from '../../utils/ExpressError.js';
import Ride from '../ride/rideModel.js';
import Booking from './bookingModel.js';
import { bookOneRide, getUserBookings } from './bookingService.js';

export const bookRide = catchAsync(async (req, res) => {
  logger.info('inside bookRide controller');
  const { startLocation, destination } = req.body;
  const { id } = req.user;
  const bookedRide = await bookOneRide(startLocation, destination, id);

  res.status(200).json({
    staus: 'success',
    data: {
      bookedRide,
    },
  });
});

export const getBookings = catchAsync(async (req, res) => {
  logger.info('inside getBookings service');
  const { id } = req.user;
  const bookings = await getUserBookings(id);

  res.status(200).json({
    status: 'success',
    result: bookings.length,
    data: {
      bookings,
    },
  });
});
