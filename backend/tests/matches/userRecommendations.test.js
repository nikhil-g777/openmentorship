const supertest = require('supertest');
const app = require('../../server');
const db = require('../../db');

describe('user recommendations test', () => {
  // Add token to environment variable
  beforeAll(async () => {
    const response = await supertest(app).post(
      `/users/tempAuth/${
        process.env.JEST_ACCOUNT_TYPE === 'mentee'
          ? process.env.JEST_MENTEE_ID
          : process.env.JEST_MENTOR_ID
      }`,
    );
    expect(response.body.success).toBe(true);
    process.env.JEST_TOKEN = response.body.token;
  });

  // Close DB connection after all tests are done
  afterAll(() => {
    db.close();
  });

  // Unauthorized access
  test('unauthorized access', async () => {
    const response = await supertest(app).get('/matches/userRecommendations');
    expect(response.statusCode).toBe(401);
    expect(response.text).toBeDefined();
    expect(response.text).toBe('Unauthorized');
  });

  // Successful request
  test('successful request', async () => {
    const response = await supertest(app)
      .get('/matches/userRecommendations')
      .set('Authorization', `Bearer ${process.env.JEST_TOKEN}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBe(true);
    expect(response.body.recommendations).toBeDefined();
    expect(response.body.recommendations.length).toBe(10);
  });
});
