const mongoose = require('mongoose');

// Schema
const { Schema } = mongoose;

const reviewSchema = new Schema({
  session: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Session',
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    default: null,
  },
  review: {
    type: String,
    default: null,
  },
  personalNote: {
    type: String,
    default: null,
  },
});

module.exports = mongoose.model('Review', reviewSchema);
