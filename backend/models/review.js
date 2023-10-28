const mongoose = require('mongoose');

// Schema
const { Schema } = mongoose;

const reviewSchema = new Schema({
  session: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'session',
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  review: {
    type: String,
    required: true,
  },
  personalNote: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model('Review', reviewSchema);
