const supertest = require('supertest');
const app = require('../../server');
const db = require('../../db');
const utils = require('../../lib/utils');

describe('confirm registration test', () => {
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
    process.env.JEST_TOKEN = response.body.user._id;
  });

  // Close DB connection after all tests are done
  afterAll(() => {
    db.close();
  });

  // Missing confirmation token
  test('missing confirmation token', async () => {
    const response = await supertest(app).get('/users/confirmRegistration');
    expect(response.status).toBe(400);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBe(false);
    expect(response.body.err).toBeDefined();
    expect(response.body.err).toBe('Missing confirmation token');
  });  
  
  // Invalid token
  test('invalid token', async () => {
    const response = await supertest(app).get('/users/confirmRegistration?confirmationToken=123456789');
    expect(response.status).toBe(400);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBe(false);
    expect(response.body.err).toBeDefined();
    expect(response.body.err).toBe('Invalid Token');
});

// Successfull registration
test('successfull registration', async () => {
    const token = utils.encodeRegistrationToken(process.env.JEST_TOKEN);
    const response = await supertest(app).get(`/users/confirmRegistration?confirmationToken=${token}`);
    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBe(true);
    expect(response.body.msg).toBeDefined();
    expect(response.body.msg).toBe('Registration Confirmed');
});

});