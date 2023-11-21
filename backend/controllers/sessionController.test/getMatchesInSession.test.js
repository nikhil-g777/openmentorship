const supertest = require('supertest');
const {
  initDBServer,
  initUsers,
  closeDBServer,
  addToken,
} = require('../../helpers/initTestDB');
const app = require('../../server');

describe('getMatchesInSession helper function test', () => {
  // Init DB server
  beforeAll(async () => {
    await initDBServer();
    await initUsers();
    await addToken(supertest);
  });
  // Close connection after test
  afterAll(async () => {
    await closeDBServer();
  });

  // Unauthorized error
  test('unauthorized_error', async () => {
    const response = await supertest(app).get('/sessions/matchesInSession');
    expect(response.statusCode).toBe(401);
  });

  // Session id not provided
  test('session_id_not_provided', async () => {
    const response = await supertest(app)
      .get('/sessions/matchesInSession')
      .set('Authorization', `Bearer ${process.env.JEST_TOKEN}`);
    expect(response.statusCode).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.error).toBe('sessionId not sent');
  });

  // Successful request
  test('successful_request', async () => {
    const response = await supertest(app)
      .get('/sessions/matchesInSession?sessionId=123456789')
      .set('Authorization', `Bearer ${process.env.JEST_TOKEN}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
    expect(typeof response.body.matches).toBe('object');
  });   
});
