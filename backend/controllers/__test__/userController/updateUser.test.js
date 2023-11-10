const supertest = require('supertest');
const app = require('../../../server');
const db = require('../../../db');
const { addToken } = require('../../../helpers/jest');

describe('/users/update - API test', () => {
  // Add token to environment variable
  addToken(supertest);

  // Close DB connection after all tests are done
  afterAll(() => {
    db.close();
  });

  // User object missing error
  test('user_object_missing_error', async () => {
    const response = await supertest(app)
      .put('/users/update')
      .set('Authorization', `Bearer ${process.env.JEST_TOKEN}`)
      .send({});
    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.error).toBe('request body does not have user object');
  });

  // Unauthorized user error
  test('unauthorized_error', async () => {
    const response = await supertest(app).get('/users/update');
    expect(response.status).toBe(404);
  });

  // Invalid type error
  test('invalid_type_error', async () => {
    const response = await supertest(app)
      .put('/users/update')
      .set('Authorization', `Bearer ${process.env.JEST_TOKEN}`)
      .send({ type: 'jest', user: {} });
    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.error).toBe('Invalid type');
  });

  // update user headline
  test('update_headline', async () => {
    const response = await supertest(app)
      .put('/users/update')
      .set('Authorization', `Bearer ${process.env.JEST_TOKEN}`)
      .send({
        type: 'updateUser',
        user: {
          headline: 'Jest Test Headline',
        },
      });
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe('User Updated');
    expect(response.body.user.headline).toBe('Jest Test Headline');
  });
});
