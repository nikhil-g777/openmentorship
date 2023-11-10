const supertest = require('supertest');
const app = require('../../../server');
const db = require('../../../db');
const { mentee } = require('../../../lib/role');

describe('/users/tempAuth - API test', () => {
  // Close DB connection after all tests are done
  afterAll(() => {
    db.close();
    process.env.NODE_ENV = 'test';
  });

  // No user id error
  test('no_user_id_error', async () => {
    const response = await supertest(app).post('/users/tempAuth/');
    expect(response.status).toBe(404);
  });

  // Invalid user id error
  test('invalid_user_id_error', async () => {
    const response = await supertest(app).post('/users/tempAuth/123456789');
    expect(response.status).toBe(500);
    expect(response.body.success).toBe(false);
  });

  // User not found error
  test('user_not_found_error', async () => {
    const response = await supertest(app).post(
      '/users/tempAuth/620b68f01eeb0b27c50ffabc',
    );
    expect(response.status).toBe(404);
    expect(response.body.success).toBe(false);
    expect(response.body.error).toBe('user not found');
  });

  // Successful tempAuth
  test('successful_tempAuth', async () => {
    const response = await supertest(app).post(
      `/users/tempAuth/${
        process.env.JEST_ACCOUNT_TYPE === mentee
          ? process.env.JEST_MENTEE_ID
          : process.env.JEST_MENTOR_ID
      }`,
    );
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe('Login Successful');
  });

  // Unauthorized access error
  test('unauthorized_error', async () => {
    jest.resetModules();
    const originalEnv = process.env;
    process.env = { ...originalEnv, NODE_ENV: 'jest' };
    const response = await supertest(app).post(
      '/users/tempAuth/620b68f01eeb0b27c50ffabc',
    );
    expect(response.status).toBe(401);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe('Unauthorized');
  });
});
