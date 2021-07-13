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
    twilioChannelId: { type: String },
    menteeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    mentorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    sessionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'session',
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Match', Match);
