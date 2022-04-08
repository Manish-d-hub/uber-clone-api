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

const rideSchema = new Schema({
  rideType: {
    type: String,
    required: true,
  },
  driverName: {
    type: String,
    required: true,
  },
  isBooked: {
    type: Boolean,
    default: false,
  },
  location: { type: geoSchema, required: true },
});

const Ride = model('Ride', rideSchema);

export default Ride;
