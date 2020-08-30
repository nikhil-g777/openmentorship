const mongoose = require('mongoose');

mongoose
  .connect(process.env.MONGODB_CONNECTION_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .catch((err) => {
    console.error('Connection Error', err.message);
  });

const db = mongoose.connection;

module.exports = db;
