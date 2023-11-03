const supertest = require('supertest');
const app = require('../../server');
const db = require('../../db');

describe('userInfo test', () => {
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

  // Successful user info retrieval
  test('successful user info', async () => {
    const response = await supertest(app)
      .get('/users/info/')
      .set('Authorization', `Bearer ${process.env.JEST_TOKEN}`);
    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBe(true);
    expect(response.body.user).toBeDefined();
    expect(response.body.user._id).toBeDefined();
    expect(response.body.user.userType).toBeDefined();
    expect(response.body.user.userType).toBe(process.env.JEST_ACCOUNT_TYPE);
  });

  // Unauthorized user info retrieval
  test('unauthorized user info', async () => {
    const response = await supertest(app).get('/users/info');
    expect(response.status).toBe(401);
    expect(response.body).toBeDefined();
    expect(response.text).toBeDefined();
    expect(response.text).toBe('Unauthorized');
  });
});
