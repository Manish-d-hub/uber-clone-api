import Ride from './rideModel.js';
import { logger } from '../../middleware/logger.js';
import { catchAsync } from '../../utils/catchAsync.js';
import ExpressError from '../../utils/ExpressError.js';

export const createRides = catchAsync(async (req, res) => {
  const { ride, driverName, location } = req.body;
  const newRide = await Ride.create({ ride, driverName, location });

  res.json({
    status: 'Success',
    data: {
      newRide,
    },
  });
});

export const getNearbyRides = catchAsync(async (req, res) => {
  const { distance, latlng } = req.params;
  const [lat, lng] = latlng.split(','); //19.117659, 72.863165

  // Calulating radius based on 'KM'
  const radius = distance / 6378.1;

  if (!lat || !lng) {
    throw new Error(
      'Please provide latitude and longitude in the format lat, lng'
    );
  }

  logger.info(distance, lat, lng);

  const rides = await Ride.find({
    location: {
      $geoWithin: {
        $centerSphere: [[lng, lat], radius],
      },
    },
  });

  if (rides.length === 0)
    throw new ExpressError('No nearby rides available!!', 404);

  res.status(200).json({
    status: 'Success',
    result: rides.length,
    data: rides,
  });
});
