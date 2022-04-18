import { logger } from '../../middleware/logger.js';
import ExpressError from '../../utils/ExpressError.js';
import Ride from './rideModel.js';

export const createNewRide = async (rideType, driverName, location) => {
  logger.info('Inside createNewRide service');
  const newRide = await Ride.create({ rideType, driverName, location });

  if (!newRide)
    throw new ExpressError('Uh oh! server down, try again later', 500);

  return newRide;
};

export const getRides = async (distance, latlng) => {
  logger.info('Inside getRides service');
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

  if (rides.length < 1)
    throw new ExpressError('No nearby rides available!!', 404);

  return rides;
};
