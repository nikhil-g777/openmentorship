const jwt = require('jsonwebtoken');
const fs = require('fs');
const mongoose = require('mongoose');

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

  checkRole: (roles) => (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const hasAccess = roles.find((role) => role === req.user.role);

    if (!hasAccess) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    return next();
  },

  encodeRegistrationToken(userId) {
    // The information we need to find our user in the database (not sensible info)
    const info = { id: userId };

    // The hash we will be sending to the user
    const token = jwt.sign(info, process.env.HASH_SECRET_KEY);

    return token;
  },

  decodeRegistrationToken(token) {
    try {
      const decoded = jwt.verify(token, process.env.HASH_SECRET_KEY);

      const userId = decoded.id;

      /*

    Not adding any expiry time for now

    // Check that the user didn't take too long
    let dateNow = new Date();
    let tokenTime = decoded.iat * 1000;

    // 12 hours
    let hours = 12;
    let tokenLife = hours * 60 * 1000;

    // User took too long to enter the code
    if (tokenTime + tokenLife < dateNow.getTime()) {
      return {
        expired: true,
      };
    }
    */

      // User registered in time
      return {
        success: true,
        userId,
      };
    } catch (err) {
      return {
        success: false,
        err: 'Invalid Token',
      };
    }
  },

  convertPaginationQueryParamsToInt: () => (req, res, next) => {
    req.query.page = parseInt(req.query.page);
    req.query.limit = parseInt(req.query.limit);
    next();
  },

  constructSearchFilter(searchString) {
    searchFilter = {}
    if(mongoose.Types.ObjectId.isValid(searchString)){
      searchFilter = {"_id": searchString}
    } else {
      searchFilter = {$text: {$search: searchString}}
    }

    return searchFilter;
  }

};
