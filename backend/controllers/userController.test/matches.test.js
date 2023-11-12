const supertest = require('supertest');
const app = require('../../server');
const db = require('../../db');
const { addToken } = require('../../helpers/jest');

describe('/users/matches - API test', () => {
  // Add token to environment variable
  beforeAll(async () => {
    await addToken(supertest);
  });

  // Close DB connection after all tests are done
  afterAll(() => {
    db.close();
  });

  // Unauthorized user matches error
  test('unauthorized_error', async () => {
    const response = await supertest(app).get('/users/matches');
    expect(response.status).toBe(401);
    expect(response.text).toBe('Unauthorized');
  });

  // Successful matches
  test('successful_matches', async () => {
    const response = await supertest(app)
      .get('/users/matches')
      .set('Authorization', `Bearer ${process.env.JEST_TOKEN}`);
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(typeof response.body.matches).toBe('object');
  });
});
