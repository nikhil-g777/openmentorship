const cookieParser = require('cookie-parser');
const express = require('express');

const router = express.Router();
const passport = require('passport');
require('../config/passportJWT')(passport);

const sessionController = require('../controllers/sessionController');

router.use(passport.initialize());
router.use(cookieParser());

// Get List of Sessions
router.get(
  '/sessionList',
  passport.authenticate('jwt', { session: false }),
  sessionController.sessionList,
);

// Create a Session
// Add admin auth for this
router.post(
  '/create',
  passport.authenticate('jwt', { session: false }),
  sessionController.create,
);

module.exports = router;
