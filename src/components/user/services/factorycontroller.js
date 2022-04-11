import { catchAsync } from '../../../utils/catchAsync.js';

export const getAll = (Model) =>
  catchAsync(async (req, res) => {
    const allUsers = await Model.find();

    res.status(200).json({
      status: 'success',
      results: allUsers.length,
      data: {
        data: allUsers,
      },
    });
  });

export const updateOne = (Model) =>
  catchAsync(async (req, res) => {
    const { id } = req.user;
    const { email, username } = req.body;
    const currUser = await Model.findByIdAndUpdate(
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
