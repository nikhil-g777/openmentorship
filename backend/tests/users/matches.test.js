const supertest = require('supertest');
const app = require('../../server');
const db = require('../../db');

describe('matches test', () => {
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

  // Unauthorized user matches
  test('unauthorized user matches', async () => {
    const response = await supertest(app).get('/users/matches');
    expect(response.status).toBe(401);
    expect(response.body).toBeDefined();
    expect(response.text).toBeDefined();
    expect(response.text).toBe('Unauthorized');
  });

    // Successful user matches
    test('successful user matches', async () => {
        const response = await supertest(app)
          .get('/users/matches')
          .set('Authorization', `Bearer ${process.env.JEST_TOKEN}`);
        expect(response.status).toBe(200);
        expect(response.body).toBeDefined();
        expect(response.body.success).toBe(true);
        expect(response.body.matches).toBeDefined();
        expect(typeof response.body.matches).toBe('object');
        expect(response.body.matches.active).toBeDefined();
        expect(response.body.matches.closed).toBeDefined();
        expect(response.body.matches.pending).toBeDefined();
      });
});
