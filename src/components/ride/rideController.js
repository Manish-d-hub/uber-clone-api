import { logger } from '../../middleware/logger.js';
import { catchAsync } from '../../utils/catchAsync.js';
import { createNewRide, getRides } from './rideService.js';

export const createRide = catchAsync(async (req, res) => {
  logger.info('Inside createRide controller');
  const { rideType, driverName, location } = req.body;
  const newRide = await createNewRide(rideType, driverName, location);

  res.status(200).json({
    status: 'Success',
    data: {
      newRide,
    },
  });
});

export const getNearbyRides = catchAsync(async (req, res) => {
  logger.info('Inside getNearbyRides controller');
  const { distance, latlng } = req.params;
  const rides = await getRides(distance, latlng);

  res.status(200).json({
    status: 'Success',
    result: rides.length,
    data: rides,
  });
});
