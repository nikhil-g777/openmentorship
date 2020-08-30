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
    menteeId: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    mentorId: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Match', Match);
