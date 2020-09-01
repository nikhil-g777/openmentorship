const jwt = require('jsonwebtoken');
const fs = require('fs');

const PUBLIC = fs.readFileSync(`${__dirname}/../keys/public.pem`);
const PRIVATE = fs.readFileSync(`${__dirname}/../keys/private.pem`);

module.exports = {
  refreshToken: (_id) => jwt.sign({ _id }, PRIVATE, { algorithm: 'RS256' }),

  accessToken: (_id) =>
    jwt.sign({ _id }, PRIVATE, {
      algorithm: 'RS256',
      expiresIn: 1000 * 60 * 60 * 24,
    }),

  verifyToken: (token) => {
    if (token !== undefined) {
      return jwt.verify(token, PUBLIC, { algorithm: 'RS256' });
    }
    return undefined;
  },
};
