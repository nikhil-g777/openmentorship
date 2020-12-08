const mongoose = require('mongoose');

const { Schema } = mongoose;

const Session = new Schema(
  {
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ['pending', 'active', 'closed', 'waitlist'],
      default: 'pending',
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Session', Session);
