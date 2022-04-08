import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const geoSchema = new Schema({
  type: {
    type: String,
    default: 'Point',
    enum: ['Point'],
    index: '2dsphere',
  },
  coordinates: { type: [Number] },
});

const bookingSchema = new Schema(
  {
    startLocation: { type: geoSchema, required: true },

    destination: { type: geoSchema, required: true },

    isConfrimed: {
      type: Boolean,
      default: false,
    },

    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Booking must have a User!'],
    },

    ride: {
      type: Schema.Types.ObjectId,
      ref: 'Ride',
      required: [true, 'Booking must have the ride information!'],
    },
  },
  { timestamps: true }
);

bookingSchema.pre(/^find/, function (next) {
  this.populate('user').populate({
    path: 'ride',
    select: ['driverName', 'rideType'],
  });
  next();
});

const Booking = model('Booking', bookingSchema);

export default Booking;
