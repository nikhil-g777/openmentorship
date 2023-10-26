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
    },
    status: {
      type: String,
      required: true,
      enum: ['active', 'closed'],
      default: 'active',
    },
    twilioConversationSid: { type: String },
    requestMessage: { type: String, required: true },
    match: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Match',
    },
    review: {
      type: Object,
      default: null,
    }
  },
  {
    timestamps: true,
  },
);

Session.index({ '$**': 'text' });

module.exports = mongoose.model('Session', Session);
