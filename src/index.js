import 'dotenv/config';
import express from 'express';

import { userRouter } from './components/user/userRoutes.js';
import { rideRouter } from './components/ride/rideRoutes.js';
import { bookingRouter } from './components/booking/bookingRoutes.js';
import ExpressError from './utils/ExpressError.js';
import globalErrorHandler from './middleware/errorHandler.js';

const app = express();

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

app.use('/users', userRouter);
app.use('/rides', rideRouter);
app.use('/bookings', bookingRouter);

app.all('*', (req, res, next) => {
  next(new ExpressError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

export { app };
