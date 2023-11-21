const supertest = require('supertest');
const app = require('../../server');
const { loginServerError } = require('../../lib/errorCodes');
const { initDBServer, initUsers, closeDBServer } = require('../../helpers/initTestDB');

describe('/users/login - API test', () => {
  // Add token to environment variable
  beforeAll(async () => {
    await initDBServer();
    await initUsers();
  });
  // Close DB connection after all tests are done
  afterAll(async () => {
    await closeDBServer();
  });

  // No authCode error
  test('no_authCode_error', async () => {
    const response = await supertest(app).post('/users/login/').send({});
    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe('authCode missing in the body');
  });

  // Invalid authCode error
  test('invalid_authCode_error', async () => {
    const response = await supertest(app)
      .post('/users/login/')
      .send({ authCode: '123456789' });
    expect(response.status).toBe(500);
    expect(response.body.success).toBe(false);
    expect(response.body.errorCode).toBe(loginServerError.code);
    expect(response.body.message).toBe('Unable to login user');
  });
});
