const supertest = require('supertest');
const app = require('../server');
const db = require('../db');

describe('app init testing', () => {
  afterAll(() => db.close());
  test('should console log', async () => {
    const response = await supertest(app).post(
      `/users/tempAuth/${
        process.env.JEST_ACCOUNT_TYPE === 'mentee'
          ? process.env.JEST_MENTEE_ID
          : process.env.JEST_MENTOR_ID
      }`,
    );

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe('Login Successful');
    expect(response.body.token).toBeDefined();
    expect(response.body.user).toBeDefined();
    expect(response.body.user._id).toBeDefined();
    expect(response.body.user.userType).toBeDefined();
  });
});
