import { catchAsync } from '../../utils/catchAsync.js';
import { getAllUsers, updateOneUser } from './userService.js';
import { logger } from '../../middleware/logger.js';

export const getUsers = catchAsync(async (req, res) => {
  logger.info('Inside getUsers controller');
  const data = await getAllUsers();
  // if (!data) throw new ExpressError("Couldn't find all the users", 404);
  res.status(200).json({
    status: 'success',
    results: data.length,
    data: data,
  });
});

export const updateUser = catchAsync(async (req, res) => {
  logger.info('Inside updateUser controller');
  const { id } = req.user;
  const { email, username } = req.body;
  const currUser = await updateOneUser(id, {
    email,
    username,
  });

  res.status(200).json({
    status: 'success',
    message: 'updated details',
    data: {
      currUser,
    },
  });
});
