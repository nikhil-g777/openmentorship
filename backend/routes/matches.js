const cookieParser = require('cookie-parser');
const express = require('express');

const router = express.Router();
const passport = require('passport');

require('../config/passportJWT')(passport);

const matchController = require('../controllers/matchController');
const util = require('../lib/utils');
const role = require('../lib/role');
const errorCodes = require('../lib/errorCodes');

router.use(passport.initialize());
router.use(cookieParser());

router.post(
  '/create',
  passport.authenticate('jwt', { session: false }),
  util.checkRole([role.mentee, role.mentor, role.admin]),
  matchController.createMatch,
);

router.post(
  '/update',
  passport.authenticate('jwt', { session: false }),
  util.checkRole([role.mentee, role.mentor, role.admin]),
  matchController.updateMatch,
);

// Search for mentors
router.get(
  '/searchMentors',
  (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user) => {
      if (err || !user) return next();
      // Return error if user is mentor
      if (user.userType === role.mentor) {
        res
          .status(401)
          .json({
            success: false,
            statusCode: errorCodes.loginInvalid.code,
            message: 'Unauthorized',
          });
      }
      // Set user
      req.user = user;
      next();
    })(req, res, next);
  },
  matchController.searchMentors,
);

// Search for mentors
router.get(
  '/userRecommendations',
  (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user) => {
      if (err || !user) return next();
      // Return error if user is mentor
      if (user.userType === role.mentor) {
        res
          .status(401)
          .json({
            success: false,
            statusCode: errorCodes.loginInvalid.code,
            message: 'Unauthorized',
          });
      }
      // Set user
      req.user = user;
      next();
    })(req, res, next);
  },
  matchController.userRecommendations,
);

module.exports = router;
