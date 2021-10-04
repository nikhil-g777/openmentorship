const mongoose = require('mongoose');

const { Schema } = mongoose;

const Match = new Schema(
  {
    status: {
      type: String,
      required: true,
      enum: ['pending', 'active', 'closed'],
      default: 'pending',
    },
    twilioConversationSid: { type: String },
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
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Match', Match);
