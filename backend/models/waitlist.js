const mongoose = require('mongoose');

const { Schema } = mongoose;

const Waitlist = new Schema(
  {
    userType: {
      type: String,
      required: true,
      enum: ['mentee', 'mentor'],
    },
    email: { type: String, required: true },
    registeredTime: { type: Date, required: true, default: Date.now },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Waitlist', Waitlist);
