const supertest = require('supertest');
const app = require('../../server');
const db = require('../../db');
const Match = require('../../models/match');
const { addToken } = require('../../helpers/initTestDB');

describe('/matches/create - API test', () => {
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
    const response = await supertest(app).post('/matches/create');
    expect(response.statusCode).toBe(401);
    expect(response.text).toBe('Unauthorized');
  });

  // No match object in request body
  test('no_match_object_error', async () => {
    const response = await supertest(app)
      .post('/matches/create')
      .set('Authorization', `Bearer ${process.env.JEST_TOKEN}`)
      .send({});
    expect(response.statusCode).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.error).toBe('request body does not have match object');
  });

  // menteeId is not sent error
  test('menteeId_not_sent_error', async () => {
    const response = await supertest(app)
      .post('/matches/create')
      .set('Authorization', `Bearer ${process.env.JEST_TOKEN}`)
      .send({
        match: { mentorId: '123456789', requestMessage: 'Jest backend test' },
      });
    expect(response.statusCode).toBe(500);
    expect(response.body.success).toBe(false);
  });

  // mentorId is not sent error
  test('mentorId_not_sent_error', async () => {
    const response = await supertest(app)
      .post('/matches/create')
      .set('Authorization', `Bearer ${process.env.JEST_TOKEN}`)
      .send({
        match: { menteeId: '123456789', requestMessage: 'Jest backend test' },
      });
    expect(response.statusCode).toBe(500);
    expect(response.body.success).toBe(false);
  });

  // Successful match
  test('successful_match', async () => {
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
    expect(response.body.success).toBe(true);
    expect(response.body.match.status).toBe('pending');
    // Store the created match id in environment variable
    process.env.JEST_MATCH_ID = response.body.match._id;
  });

  // Match already exists error
  test('match_exists_error', async () => {
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
    expect(response.body.success).toBe(false);
    expect(response.body.error).toBe('Match already exists');
    // Delete the created match
    const result = await Match.findByIdAndDelete(process.env.JEST_MATCH_ID);
    expect(result).toBeDefined();
  });
});
