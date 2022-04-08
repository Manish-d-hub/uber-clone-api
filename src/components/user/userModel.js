import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';

const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, 'Please provide a username.'],
      unique: true,
    },

    email: {
      type: String,
      lowercase: true,
      unique: true,
      required: [true, 'Please provide an email'],
      validate: [validator.isEmail, 'Please provide a valid email'],
    },

    password: {
      type: String,
      minlength: 8,
      required: [true, 'Please provide a password'],
      select: false,
      validate: {
        // This only works on CREATE and SAVE!!
        validator: function (el) {
          return el === this.password;
        },
        message: "Password don't match.",
      },
    },

    passwordConfirm: {
      type: String,
      required: [true, 'Please confirm your password'],
    },

    bookings: { type: Schema.Types.ObjectId, ref: 'Booking' },

    isDeleted: false,
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  // function is executed only when password is created or modified
  if (!this.isModified('password')) return next();

  // Hashing the password
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = model('User', userSchema);

export default User;
