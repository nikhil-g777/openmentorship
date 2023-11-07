const supertest = require('supertest');
const app = require('../../../server');
const db = require('../../../db');

describe('update match test', () => {
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

  // Unauthorized access
  test('unauthorized access', async () => {
    const response = await supertest(app).post('/matches/update');
    expect(response.statusCode).toBe(401);
    expect(response.text).toBeDefined();
    expect(response.text).toBe('Unauthorized');
    });   

  // Request body does not have required parameters
  test('request body does not have required parameters', async () => {
    const response = await supertest(app)
      .post('/matches/update')
      .set('Authorization', `Bearer ${process.env.JEST_TOKEN}`)
      .send({});
    expect(response.statusCode).toBe(400);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBe(false);
    expect(response.body.error).toBe(
      'request body does not have the required parameters',
    );
  });
  
  // Only matchId is sent
  test('only matchId is sent', async () => {
    const response = await supertest(app)
      .post('/matches/update')
      .set('Authorization', `Bearer ${process.env.JEST_TOKEN}`)
      .send({ matchId: '12345689' });
    expect(response.statusCode).toBe(400);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBe(false);
    expect(response.body.error).toBe(
      'request body does not have the required parameters',
    );
  });
  
  // Only status is sent
  test('only status is sent', async () => {
    const response = await supertest(app)
      .post('/matches/update')
      .set('Authorization', `Bearer ${process.env.JEST_TOKEN}`)
      .send({ status: 'active' });
    expect(response.statusCode).toBe(400);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBe(false);
    expect(response.body.error).toBe(
      'request body does not have the required parameters',
    );
  });   
});