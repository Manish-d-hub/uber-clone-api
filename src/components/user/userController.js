import { catchAsync } from '../../utils/catchAsync.js';
import User from './userModel.js';

export const getUsers = catchAsync(async (req, res) => {
  const allUsers = await User.find();

  res.status(200).json({
    status: 'success',
    results: allUsers.length,
    data: {
      data: allUsers,
    },
  });
});

export const updateUser = catchAsync(async (req, res) => {
  const { id } = req.user;
  const { email, username } = req.body;
  const currUser = await User.findByIdAndUpdate(
    id,
    { email, username },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    status: 'success',
    message: 'updated details',
    data: {
      currUser,
    },
  });
});
