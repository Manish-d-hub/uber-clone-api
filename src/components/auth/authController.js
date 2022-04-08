import jwt from 'jsonwebtoken';
import { promisify } from 'util';

import { logger } from '../../middleware/logger.js';
import { catchAsync } from '../../utils/catchAsync.js';
import ExpressError from '../../utils/ExpressError.js';
import User from '../user/userModel.js';

const signedToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const sendResToken = (user, statusCode, res) => {
  const token = signedToken(user.id);

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    // secure: true,   ## Use this option only in production
    httpOnly: true,
  };

  res.cookie('jwt', token, cookieOptions);

  user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
};

export const signUp = catchAsync(async (req, res) => {
  const { username, email, password, passwordConfirm } = req.body;

  const existingUser = await User.findOne({ username });
  if (existingUser)
    throw new ExpressError('Username is taken! Try another', 400);

  const newUser = await User.create({
    username,
    email,
    password,
    passwordConfirm,
  });

  sendResToken(newUser, 200, res);
});

export const loginUser = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ExpressError('Please provide email and password', 400);
  }

  const user = await User.findOne({ email }).select('+password');
  if (!user || !(await user.correctPassword(password, user.password))) {
    throw new ExpressError('Incorrect email or password', 401);
  }

  // const token = signedToken(user.id);
  // res.status(200).json({
  //   status: "success",
  //   token,
  // });

  user.createdAt = undefined;
  user.updatedAt = undefined;
  sendResToken(user, 200, res);
});

export const protect = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    throw new ExpressError(
      'You are not logged in! Please log in to continue.',
      401
    );
  }

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  // logger.info(decoded);

  const currUser = await User.findById(decoded.id);
  if (!currUser) {
    throw new ExpressError('The user of this token no longer exists!', 401);
  }

  req.user = currUser;
  next();
});
