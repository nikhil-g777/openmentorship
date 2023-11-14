const supertest = require('supertest');
const app = require('../../server');
const db = require('../../db');
const { addToken } = require('../../helpers/initTestDB');

describe('/matches/update - API test', () => {
  // Add token to environment variable
  beforeAll(async () => {
    await addToken(supertest);
  });

  // Close DB connection after all tests are done
  afterAll(() => {
    db.close();
  });

  // Unauthorized error
  test('unauthorized_error', async () => {
    const response = await supertest(app).post('/matches/update');
    expect(response.statusCode).toBe(401);
    expect(response.text).toBe('Unauthorized');
    });   

  // Request body does not have required parameters error
  test('required_parameters_error', async () => {
    const response = await supertest(app)
      .post('/matches/update')
      .set('Authorization', `Bearer ${process.env.JEST_TOKEN}`)
      .send({});
    expect(response.statusCode).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.error).toBe(
      'request body does not have the required parameters',
    );
  });
  
  // Only matchId is sent error
  test('only_matchId_sent_error', async () => {
    const response = await supertest(app)
      .post('/matches/update')
      .set('Authorization', `Bearer ${process.env.JEST_TOKEN}`)
      .send({ matchId: '12345689' });
    expect(response.statusCode).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.error).toBe(
      'request body does not have the required parameters',
    );
  });
  
  // Only status is sent error
  test('only_status_sent_error', async () => {
    const response = await supertest(app)
      .post('/matches/update')
      .set('Authorization', `Bearer ${process.env.JEST_TOKEN}`)
      .send({ status: 'active' });
    expect(response.statusCode).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.error).toBe(
      'request body does not have the required parameters',
    );
  });   
});