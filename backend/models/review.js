const mongoose = require('mongoose');

// Schema
const { Schema } = mongoose;

const reviewSchema = new Schema({
  session: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Session',
  },
  mentor: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  mentee: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true,
  },
  review: {
    type: String,
    default: null,
  },
  personalNote: {
    type: String,
    default: null,
  }
});

module.exports = mongoose.model('Review', reviewSchema);
