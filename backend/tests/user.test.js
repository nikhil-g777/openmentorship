const supertest = require('supertest');
const app = require('../server');
const db = require('../db');

describe('tempAuth test', () => {
  // Close DB connection after all tests are done
  afterAll(() => db.close());

  // No user id provided
  test('no user id provided', async () => {
    const response = await supertest(app).post('/users/tempAuth/');
    expect(response.status).toBe(404);
    expect(response.body).toBeDefined();
  });

  // Invalid user id provided
  test('invalid user id provided', async () => {
    const response = await supertest(app).post('/users/tempAuth/123456789');
    expect(response.status).toBe(500);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBe(false);
    expect(response.body.error).toBeDefined();
  });

  // User not found
  test('user not found', async () => {
    const response = await supertest(app).post(
      '/users/tempAuth/620b68f01eeb0b27c50ffabc',
    );
    expect(response.status).toBe(404);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBe(false);
    expect(response.body.error).toBeDefined();
    expect(response.body.error).toBe('user not found');
  });

  // Successful tempAuth response
  test('successful tempAuth response', async () => {
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

  // Unauthorized access
  test('unauthorized access', async () => {
    jest.resetModules();
    const originalEnv = process.env;
    process.env = { ...originalEnv, NODE_ENV: 'jest' };
    const response = await supertest(app).post(
      '/users/tempAuth/620b68f01eeb0b27c50ffabc',
    );
    expect(response.status).toBe(401);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBeDefined();
    expect(response.body.message).toBe('Unauthorized');
  });
});
