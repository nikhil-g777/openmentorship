require('dotenv').config();
const supertest = require('supertest');
const {
  initDBServer,
  initUsers,
  addToken,
  closeDBServer,
} = require('../../helpers/initTestDB');
const app = require('../../server');

describe('/sessions/sessionList - API test', () => {
  // Add token to environment variable
  beforeAll(async () => {
    await initDBServer();
    await initUsers();
    await addToken(supertest);
  });

  // Close DB connection after all tests are done
  afterAll(async () => {
    await closeDBServer();
  });

  // Unauthorized error
  test('unauthorized_error', async () => {
    const response = await supertest(app).get('/sessions/sessionList');
    expect(response.statusCode).toBe(401);
  });

  // Successful request
  test('successful_request', async () => {
    const response = await supertest(app)
      .get('/sessions/sessionList')
      .set('Authorization', `Bearer ${process.env.JEST_TOKEN}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
    expect(typeof response.body.sessions).toBe('object');
  });
});
