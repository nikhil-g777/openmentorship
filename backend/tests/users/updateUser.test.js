const supertest = require('supertest');
const app = require('../../server');
const db = require('../../db');

describe('update user test', () => {
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

  // No user object provided
  test('no user object provided', async () => {
    const response = await supertest(app)
      .put('/users/update')
      .set('Authorization', `Bearer ${process.env.JEST_TOKEN}`)
      .send({});
    expect(response.status).toBe(400);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBe(false);
    expect(response.body.error).toBeDefined();
    expect(response.body.error).toBe('request body does not have user object');
  });

  // Unauthorized user update
  test('unauthorized user update', async () => {
    const response = await supertest(app).get('/users/update');
    expect(response.status).toBe(404);
    expect(response.body).toBeDefined();
    expect(response.text).toBeDefined();
    expect(response.text).toBe('<h1>Not Found</h1>\n<h2></h2>\n<pre></pre>\n');
  });

  // Invalid type provided
  test('invalid type provided', async () => {
    const response = await supertest(app)
      .put('/users/update')
      .set('Authorization', `Bearer ${process.env.JEST_TOKEN}`)
      .send({ type: 'jest', user: {} });
    expect(response.status).toBe(400);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBe(false);
    expect(response.body.error).toBeDefined();
    expect(response.body.error).toBe('Invalid type');
  });
  
  // update user
  test('update user', async () => {
    const response = await supertest(app)
      .put('/users/update')
      .set('Authorization', `Bearer ${process.env.JEST_TOKEN}`)
      .send({
        type: 'updateUser',
        user: {
          headline: 'Jest Test Headline',
        }
    });
    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBeDefined();
    expect(response.body.message).toBe('User Updated');
    expect(response.body.user).toBeDefined();
    expect(response.body.user._id).toBeDefined();
    expect(response.body.user.headline).toBeDefined();
    expect(response.body.user.headline).toBe('Jest Test Headline');
  });
});
