const mongoose = require('mongoose');

// Connection URI
const connectionURI =
  process.env.JEST_TEST === 'true'
    ? process.env.JEST_DATABASE_URI
    : process.env.MONGODB_CONNECTION_URI;

// Connect to MongoDB
if (process.env.NODE_ENV !== 'test') {
  mongoose
    .connect(connectionURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    })
    .catch((err) => {
      console.error('Connection Error', err.message);
    });
}

const db = mongoose.connection;

module.exports = db;
