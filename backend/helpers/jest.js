const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../server');
const { mentee } = require('../lib/role');

module.exports = {
  addToken: async (supertest) => {
    const response = await supertest(app).post(
      `/users/tempAuth/${
        process.env.JEST_ACCOUNT_TYPE === mentee
          ? process.env.JEST_MENTEE_ID
          : process.env.JEST_MENTOR_ID
      }`,
    );
    expect(response.body.success).toBe(true);
    process.env.JEST_TOKEN = response.body.token;
  },
  startDatabase: async (MongoClient) => {
    const mongod = new MongoMemoryServer();
    const uri = await mongod.getUri();
    const client = await MongoClient.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const db = client.db(await mongod.getDbName());
    return { client, db };
  },
  stopDatabase: async (mongod, client) => {
    await client.close();
    await mongod.stop();
  },
};
