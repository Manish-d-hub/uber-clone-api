import { logger } from '../../middleware/logger.js';
import { catchAsync } from '../../utils/catchAsync.js';
import User from './userModel.js';
import ExpressError from '../../utils/ExpressError.js';

export const getAllUsers = async () => {
  logger.info('Inside getAll service');
  const allUsers = await User.find();
  logger.info(allUsers.length);
  if (allUsers.length < 1)
    throw new ExpressError("Couldn't find all the users", 404);

  return allUsers;
};

export const updateOneUser = async (userId, userObj) => {
  try {
    const currUser = await User.findByIdAndUpdate(userId, userObj, {
      new: true,
      runValidators: true,
    });
    if (!currUser) throw new ExpressError('User not found', 404);
    return currUser;
  } catch (error) {
    logger.error(error);
    throw new ExpressError(error.message, error.statusCode);
  }
};
