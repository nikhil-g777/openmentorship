const fs = require('fs');
const JwtStrategy = require('passport-jwt').Strategy;

const PUBLIC_KEY = fs.readFileSync(`${__dirname}/../keys/public.pem`);
const User = require('../models/user');

// Commenting for now, but can be used if we switch to cookies
// const cookieExtractor = (req) => {
//   console.log(req.headers);
//   let token = null;

//   if (req && req.cookies) {
//     token = req.cookies.accessToken; // authorization Bearer token
//   }

//   return token;
// };

const headerTokenExtractor = (req) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    return token;
  }
  return null;
};

const options = {
  secretOrKey: PUBLIC_KEY,
  jwtFromRequest: headerTokenExtractor,
  algorithms: 'RS256',
};

const verify = (payload, done) => {
  User.findById(payload._id)
    .then((user) => {
      if (user) {
        return done(null, user);
      }
      return done(null, false);
    })
    .catch((err) => done(err));
};

const strategy = new JwtStrategy(options, verify);

module.exports = (passport) => passport.use(strategy);
