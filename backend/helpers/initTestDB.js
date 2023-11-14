require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { EJSON } = require('bson');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const User = require('../models/user');
const app = require('../server');
const { mentee } = require('../lib/role');

// Variables
let mongoServer;

// Read users.json
const json = fs.readFileSync(
  path.resolve(__dirname, '../dump/users.json'),
  'utf8',
);
// Parse users.json
const users = EJSON.parse(json);

// Init MongoDB memory server
const initDBServer = async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri(), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

// Close MongoDB memory server
const closeDBServer = async () => {
  await mongoose.disconnect();
  if (mongoServer) {
    await mongoServer.stop();
  }
};

// Add token to environment variable
const addToken = async (supertest) => {
  const response = await supertest(app).post(
    `/users/tempAuth/${
      process.env.JEST_ACCOUNT_TYPE === mentee
        ? process.env.JEST_MENTEE_ID
        : process.env.JEST_MENTOR_ID
    }`,
  );
  expect(response.body.success).toBe(true);
  process.env.JEST_TOKEN = response.body.token;
};

// Insert users to DB
const initUsers = async () => {
  const result = await User.insertMany(users);
  return result;
};

module.exports = { initDBServer, closeDBServer, addToken, initUsers };
