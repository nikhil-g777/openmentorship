const mongoose = require('mongoose');

const { Schema } = mongoose;

const Token = new Schema({
  refreshToken: String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
});

module.exports = mongoose.model('token', Token);
