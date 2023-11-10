const supertest = require('supertest');
const app = require('../../../server');
const db = require('../../../db');
const { addToken } = require('../../../helpers/jest');

describe('/users/info - API test', () => {
  // Add token to environment variable
  addToken(supertest);

  // Close DB connection after all tests are done
  afterAll(() => {
    db.close();
  });

  // Successful user info
  test('successful_user_info', async () => {
    const response = await supertest(app)
      .get('/users/info/')
      .set('Authorization', `Bearer ${process.env.JEST_TOKEN}`);
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.user.userType).toBe(process.env.JEST_ACCOUNT_TYPE);
  });

  // Unauthorized error
  test('unauthorized_error', async () => {
    const response = await supertest(app).get('/users/info');
    expect(response.status).toBe(401);
    expect(response.text).toBe('Unauthorized');
  });
});
