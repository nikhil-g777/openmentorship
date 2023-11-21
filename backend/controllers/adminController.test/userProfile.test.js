const supertest = require('supertest');
const {
  initDBServer,
  initUsers,
  addToken,
  closeDBServer,
} = require('../../helpers/initTestDB');
const User = require('../../models/user');
const app = require('../../server');

describe('/admin/userProfile - API test', () => {
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

  // Unauthorized error
  test('unauthorized_error', async () => {
    const response = await supertest(app).get('/admin/userProfile');
    expect(response.statusCode).toBe(401);
    expect(response.text).toBe('Unauthorized');
  });

  // Unauthorized error (NOT ADMIN)
  test('unauthorized_error_not_admin', async () => {
    const response = await supertest(app)
      .get('/admin/userProfile')
      .set('Authorization', `Bearer ${process.env.JEST_TOKEN}`);
    expect(response.statusCode).toBe(401);
  });

  // Update user role
  test('update_user_role', async () => {
    const userId =
      process.env.JEST_ACCOUNT_TYPE === 'mentee'
        ? process.env.JEST_MENTEE_ID
        : process.env.JEST_MENTOR_ID;
    const user = await User.findByIdAndUpdate(
      { _id: userId },
      { role: 'admin' },
      { new: true },
    );
    await addToken(supertest);
    expect(user.role).toBe('admin');
  });

  // userId not provided
  test('userId_not_provided', async () => {
    const response = await supertest(app)
      .get('/admin/userProfile')
      .set('Authorization', `Bearer ${process.env.JEST_TOKEN}`);
    expect(response.statusCode).toBe(500);
    expect(response.body.success).toBe(false);
  }, 30000);

  // Successful user search
  test('user_profile', async () => {
    const id =
      process.env.JEST_ACCOUNT_TYPE === 'mentee'
        ? process.env.JEST_MENTEE_ID
        : process.env.JEST_MENTOR_ID;
    const response = await supertest(app)
      .get(`/admin/userProfile?userId=${id}`)
      .set('Authorization', `Bearer ${process.env.JEST_TOKEN}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
  });
});
