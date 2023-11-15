require('dotenv').config();
const mongoose = require('mongoose');

const { Schema } = mongoose;

const Match = new Schema(
  {
    initialMessage: { type: String, default: '' },
    status: {
      type: String,
      enum: ['pending', 'active', 'closed'],
      default: 'pending',
      required: true,
    },
    requestMessage: { type: String, required: process.env.NODE_ENV !== 'test' },
    mentee: {
      type: mongoose.Schema.Types.ObjectId,
      required: process.env.NODE_ENV !== 'test',
      ref: 'user',
    },
    mentor: {
      type: mongoose.Schema.Types.ObjectId,
      required: process.env.NODE_ENV !== 'test',
      ref: 'user',
    },
    latestSession: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Session',
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Match', Match);
