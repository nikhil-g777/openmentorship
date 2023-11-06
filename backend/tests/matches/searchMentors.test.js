const supertest = require('supertest');
const app = require('../../server');
const db = require('../../db');

describe('search mentors test', () => {
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
    const response = await supertest(app).get('/matches/searchMentors');
    expect(response.statusCode).toBe(401);
    expect(response.text).toBeDefined();
    expect(response.text).toBe('Unauthorized');
  });

  // Successful request
  test('successful request', async () => {
    const response = await supertest(app)
      .get('/matches/searchMentors')
      .set('Authorization', `Bearer ${process.env.JEST_TOKEN}`)
      .query({ page: 1, limit: 10 });
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBe(true);
    expect(response.body.mentors).toBeDefined();
    expect(response.body.mentors.length).toBe(10);
    expect(response.body.totalPages).toBeDefined();
    expect(response.body.currentPage).toBeDefined();
    expect(response.body.currentPage).toBe('1');
  });

  // No page and limit
  test('no page and limit', async () => {
    const response = await supertest(app)
      .get('/matches/searchMentors')
      .set('Authorization', `Bearer ${process.env.JEST_TOKEN}`);
    expect(response.statusCode).toBe(400);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBe(false);
    expect(response.body.error).toBe('page and limit needs to be sent');
  });

  // Current page to 2
  test('current page to 2', async () => {
    const response = await supertest(app)
      .get('/matches/searchMentors')
      .set('Authorization', `Bearer ${process.env.JEST_TOKEN}`)
      .query({ page: 2, limit: 10 });
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBe(true);
    expect(response.body.mentors).toBeDefined();
    expect(response.body.totalPages).toBeDefined();
    expect(response.body.currentPage).toBeDefined();
    expect(response.body.currentPage).toBe('2');
  });

  // Limit to 5
  test('limit to 5', async () => {
    const response = await supertest(app)
      .get('/matches/searchMentors')
      .set('Authorization', `Bearer ${process.env.JEST_TOKEN}`)
      .query({ page: 1, limit: 5 });
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBe(true);
    expect(response.body.mentors).toBeDefined();
    expect(response.body.mentors.length).toBe(5);
    expect(response.body.totalPages).toBeDefined();
    expect(response.body.currentPage).toBeDefined();
    expect(response.body.currentPage).toBe('1');
  });
});
