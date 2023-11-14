const supertest = require('supertest');
const app = require('../../server');
const {
  initUsers,
  initDBServer,
  closeDBServer,
  addToken,
} = require('../../helpers/initTestDB');

describe('/users/info - API test', () => {
  beforeAll(async () => {
    // Init MongoDB memory server
    await initDBServer();

    // Add User to DB
    await initUsers();

    // Add token to environment variable
    await addToken(supertest);
  });

  // Close DB connection after all tests are done
  afterAll(async () => {
    await closeDBServer();
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
