const supertest = require('supertest');
const app = require('../../server');
const db = require('../../db');
const Match = require('../../models/match');

describe('create match test', () => {
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
    const response = await supertest(app).post('/matches/create');
    expect(response.statusCode).toBe(401);
    expect(response.text).toBeDefined();
    expect(response.text).toBe('Unauthorized');
  });

  // No match object in request body
  test('no match object in request body', async () => {
    const response = await supertest(app)
      .post('/matches/create')
      .set('Authorization', `Bearer ${process.env.JEST_TOKEN}`)
      .send({});
    expect(response.statusCode).toBe(400);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBe(false);
    expect(response.body.error).toBe('request body does not have match object');
  });

  // menteeId is not sent
  test('menteeId is not sent', async () => {
    const response = await supertest(app)
      .post('/matches/create')
      .set('Authorization', `Bearer ${process.env.JEST_TOKEN}`)
      .send({
        match: { mentorId: '123456789', requestMessage: 'Jest backend test' },
      });
    expect(response.statusCode).toBe(500);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBe(false);
  });

  // mentorId is not sent
  test('mentorId is not sent', async () => {
    const response = await supertest(app)
      .post('/matches/create')
      .set('Authorization', `Bearer ${process.env.JEST_TOKEN}`)
      .send({
        match: { menteeId: '123456789', requestMessage: 'Jest backend test' },
      });
    expect(response.statusCode).toBe(500);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBe(false);
  });

  // Successful match creation
  test('successful match creation', async () => {
    const response = await supertest(app)
      .post('/matches/create')
      .set('Authorization', `Bearer ${process.env.JEST_TOKEN}`)
      .send({
        match: {
          menteeId: process.env.JEST_MENTEE_ID,
          mentorId: process.env.JEST_MENTOR_ID,
          requestMessage: 'Jest backend test',
        },
      });
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBe(true);
    expect(response.body.match).toBeDefined();
    expect(response.body.match.mentee).toBeDefined();
    expect(response.body.match.mentor).toBeDefined();
    expect(response.body.match.requestMessage).toBeDefined();
    expect(response.body.match.status).toBeDefined();
    expect(response.body.match.status).toBe('pending');
    // Store the created match id in environment variable
    process.env.JEST_MATCH_ID = response.body.match._id;
  });

  // Match already exists
  test('match already exists', async () => {
    const response = await supertest(app)
      .post('/matches/create')
      .set('Authorization', `Bearer ${process.env.JEST_TOKEN}`)
      .send({
        match: {
          menteeId: process.env.JEST_MENTEE_ID,
          mentorId: process.env.JEST_MENTOR_ID,
          requestMessage: 'Jest backend test',
        },
      });
    expect(response.statusCode).toBe(500);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBe(false);
    expect(response.body.error).toBe('Match already exists');
    // Delete the created match
    const result = await Match.findByIdAndDelete(process.env.JEST_MATCH_ID);
    expect(result).toBeDefined();
  });
});
