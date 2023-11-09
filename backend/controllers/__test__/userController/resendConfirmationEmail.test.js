const supertest = require('supertest');
const app = require('../../../server');
const db = require('../../../db');

describe('resend confirmation email test', () => {
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

  // Error sending confirmation email
  test('error sending confirmation email', async () => {
    const response = await supertest(app).post('/users/resendConfirmationEmail').send({});
    expect(response.status).toBe(500);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBe(false);
    expect(response.body.error).toBeDefined();
    expect(response.body.error).toBe('Error sending confirmation email');
  });
  
  // Successful resend confirmation email
  test('successful resend confirmation email', async () => {
    const userInfo = await supertest(app).get('/users/info').set('Authorization', `Bearer ${process.env.JEST_TOKEN}`);
    const response = await supertest(app).post('/users/resendConfirmationEmail').send(userInfo.body.user);
    expect(userInfo).toBeDefined();
    expect(response).toBeDefined();
  });   
});
