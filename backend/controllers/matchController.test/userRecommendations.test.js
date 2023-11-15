const supertest = require('supertest');
const app = require('../../server');
const { addToken, initDBServer, initUsers, closeDBServer } = require('../../helpers/initTestDB');

describe('/matches/userRecommendations - API test', () => {
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
    const response = await supertest(app).get('/matches/userRecommendations');
    expect(response.statusCode).toBe(401);
    expect(response.text).toBe('Unauthorized');
  });

  // Successful request
  test('successful_request', async () => {
    const response = await supertest(app)
      .get('/matches/userRecommendations')
      .set('Authorization', `Bearer ${process.env.JEST_TOKEN}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.recommendations.length).toBe(10);
  });
});
