const cookieParser = require('cookie-parser');
const express = require('express');

const router = express.Router();
const passport = require('passport');
require('../config/passportJWT').passportJWT(passport);

const sessionController = require('../controllers/sessionController');
const util = require('../lib/utils');
const role = require('../lib/role');

router.use(passport.initialize());
router.use(cookieParser());

// Get List of Sessions
router.get(
  '/sessionList',
  passport.authenticate('jwt', { session: false }),
  util.checkRole([role.mentee, role.mentor, role.admin]),
  sessionController.sessionList,
);

// Get Matches In Session
router.get(
  '/matchesInSession',
  passport.authenticate('jwt', { session: false }),
  util.checkRole([role.mentee, role.mentor, role.admin]),
  sessionController.getMatchesInSession,
);

module.exports = router;
