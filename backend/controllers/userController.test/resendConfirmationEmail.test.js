const supertest = require('supertest');
const app = require('../../server');
const { addToken, initDBServer, initUsers, closeDBServer } = require('../../helpers/initTestDB');

describe('/users/resendConfirmationEmail - API test', () => {
  // Add token to environment variable
  beforeAll(async () => {
    await initDBServer();
    await initUsers();
    await addToken(supertest);
  });

  // Close DB connection after all tests are done
  afterAll(async () => {
    await closeDBServer();
  });

  // Error sending confirmation email
  test('confirmation_sending_error', async () => {
    const response = await supertest(app).post('/users/resendConfirmationEmail').send({});
    expect(response.status).toBe(500);
    expect(response.body.success).toBe(false);
    expect(response.body.error).toBe('Error sending confirmation email');
  });
  
  // Successful resend confirmation email
  test('successful_resend_confirmation', async () => {
    const userInfo = await supertest(app).get('/users/info').set('Authorization', `Bearer ${process.env.JEST_TOKEN}`);
    const response = await supertest(app).post('/users/resendConfirmationEmail').send(userInfo.body.user);
    expect(userInfo).toBeDefined();
    expect(response).toBeDefined();
  });   
});
