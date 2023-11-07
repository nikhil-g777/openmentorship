const supertest = require('supertest');
const app = require('../../../server');
const db = require('../../../db');

describe('login test', () => {
  // Close DB connection after all tests are done
  afterAll(() => {
    db.close();
  });

  // No authCode provided
  test('no authCode provided', async () => {
    const response = await supertest(app).post('/users/login/').send({});
    expect(response.status).toBe(400);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBeDefined();
    expect(response.body.message).toBe('authCode missing in the body');
  });

  // Invalid authCode provided
  test('invalid authCode provided', async () => {
    const response = await supertest(app)
      .post('/users/login/')
      .send({ authCode: '123456789' });
    expect(response.status).toBe(500);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBeDefined();
    expect(response.body.errorCode).toBeDefined();
    expect(response.body.errorCode).toBe('loginServerError');
    expect(response.body.message).toBe('Unable to login user');
  });

});
