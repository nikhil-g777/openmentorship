const cookieParser = require('cookie-parser');
const express = require('express');

const router = express.Router();
const passport = require('passport');
require('../config/passportJWT')(passport);

const matchController = require('../controllers/matchController');
const util = require('../lib/utils');
const role = require('../lib/role');

router.use(passport.initialize());
router.use(cookieParser());

// Matches list
router.get(
  '/list/:_id',
  passport.authenticate('jwt', { session: false }),
  util.checkRole([role.mentee, role.mentor, role.admin]),
  matchController.getMatches,
);

// Send message to a mentor
router.post(
  '/sendMessage/:matchId',
  passport.authenticate('jwt', { session: false }),
  util.checkRole([role.mentee]),
  matchController.sendMessage,
);

// Send message to a mentor
router.post(
  '/create',
  passport.authenticate('jwt', { session: false }),
  util.checkRole([role.admin]),
  matchController.createMatch,
);

module.exports = router;
