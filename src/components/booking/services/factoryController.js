import { logger } from '../../../middleware/logger.js';
import { catchAsync } from '../../../utils/catchAsync.js';
import ExpressError from '../../../utils/ExpressError.js';

export const bookOne = (Model_1, Model_2) =>
  catchAsync(async (req, res) => {
    const { startLocation, destination } = req.body;

    const radius = 5 / 6378.1;

    const [lng, lat] = startLocation.coordinates.map((el) => el);

    logger.info(lng);
    logger.info(lat);

    const ride = await Model_1.find({
      isBooked: false,
      location: {
        $geoWithin: {
          $centerSphere: [[lng, lat], radius],
        },
      },
    });

    if (ride.length === 0) {
      throw new ExpressError('Uh oh! No rides nearby.', 401);
    }
    const nearestRide = ride[0].id;
    logger.info(ride);

    const bookedRide = await Model_2.create({
      startLocation,
      destination,
      isConfrimed: true,
      ride: nearestRide,
      user: req.user.id,
    });

    res.status(200).json({
      staus: 'success',
      data: {
        bookedRide,
      },
    });
  });

export const getAll = (Model) =>
  catchAsync(async (req, res) => {
    const bookings = await Model.find({ user: req.user.id });

    if (bookings.length === 0)
      throw new ExpressError('You have not done any bookings yet!', 404);

    res.status(200).json({
      status: 'success',
      data: {
        bookings,
      },
    });
  });
