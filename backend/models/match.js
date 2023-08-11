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
    requestMessage: { type: String, required: true },
    mentee: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'user',
    },
    mentor: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
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
