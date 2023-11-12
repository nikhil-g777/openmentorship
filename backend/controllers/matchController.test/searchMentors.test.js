const supertest = require('supertest');
const app = require('../../server');
const db = require('../../db');
const { addToken } = require('../../helpers/jest');

describe('/matches/searchMentors - API test', () => {
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
    const response = await supertest(app).get('/matches/searchMentors');
    expect(response.statusCode).toBe(401);
    expect(response.text).toBe('Unauthorized');
  });

  // Successful request
  test('successful_request', async () => {
    const response = await supertest(app)
      .get('/matches/searchMentors')
      .set('Authorization', `Bearer ${process.env.JEST_TOKEN}`)
      .query({ page: 1, limit: 10 });
    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.mentors.length).toBe(10);
    expect(response.body.currentPage).toBe('1');
  });

  // No page and limit error
  test('no_page_limit_error', async () => {
    const response = await supertest(app)
      .get('/matches/searchMentors')
      .set('Authorization', `Bearer ${process.env.JEST_TOKEN}`);
    expect(response.statusCode).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.error).toBe('page and limit needs to be sent');
  });

  // Current page to 2
  test('current_page_2', async () => {
    const response = await supertest(app)
      .get('/matches/searchMentors')
      .set('Authorization', `Bearer ${process.env.JEST_TOKEN}`)
      .query({ page: 2, limit: 10 });
    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.currentPage).toBe('2');
  });

  // Limit to 5
  test('limit_to_5', async () => {
    const response = await supertest(app)
      .get('/matches/searchMentors')
      .set('Authorization', `Bearer ${process.env.JEST_TOKEN}`)
      .query({ page: 1, limit: 5 });
    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.mentors.length).toBe(5);
    expect(response.body.currentPage).toBe('1');
  });
});
