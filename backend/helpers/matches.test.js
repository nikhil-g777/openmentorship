require('dotenv').config();
const { initDBServer, closeDBServer, initUsers } = require('./initTestDB');
const { getActiveMentorIds } = require('./matches');

describe('getActiveMentorIds helper function test', () => {
  // Init DB server
  beforeAll(async () => {
    await initDBServer();
    await initUsers();
  });
  // Close connection after test
  afterAll(async () => {
    await closeDBServer();
  });

  test('should be a function', () => {
    expect(typeof getActiveMentorIds).toBe('function');
  });

  test('should throw error if menteeId is not provided', async () => {
    await expect(getActiveMentorIds()).rejects.toThrow(
      'Mentee Id not provided',
    );
  });

  test('should return empty array if mentorId is provided', async () => {
    const result = await getActiveMentorIds(process.env.JEST_MENTOR_ID);
    expect(result).toEqual([]);
    expect(result.length).toBe(0);
  });

  test('should return array of mentorIds if menteeId is provided', async () => {
    const result = await getActiveMentorIds(process.env.JEST_MENTEE_ID);
    expect(result).toEqual([]);
  });

  test('should return error if menteeId is invalid', async () => {
    const result = await getActiveMentorIds('invalidId');
    expect(result).toBeInstanceOf(Error);
  });
});
