const app = require('../server');
const { mentee } = require('../lib/role');

module.exports = {
  addToken: async (supertest) => {
    const response = await supertest(app).post(
      `/users/tempAuth/${
        process.env.JEST_ACCOUNT_TYPE === mentee
          ? process.env.JEST_MENTEE_ID
          : process.env.JEST_MENTOR_ID
      }`,
    );
    expect(response.body.success).toBe(true);
    process.env.JEST_TOKEN = response.body.token;
  },
};
