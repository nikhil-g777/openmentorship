const cookieParser = require('cookie-parser');
const express = require('express');

const router = express.Router();
const passport = require('passport');

require('../config/passportJWT')(passport);

const adminController = require('../controllers/adminController');
const util = require('../lib/utils');
const role = require('../lib/role');

router.use(passport.initialize());
router.use(cookieParser());

router.get(
  '/statistics',
  passport.authenticate('jwt', { session: false }),
  util.checkRole([role.admin]),
  adminController.statistics,
);

router.get(
  '/userList',
  passport.authenticate('jwt', { session: false }),
  util.checkRole([role.admin]),
  adminController.userList,
);

router.get(
  '/userProfile',
  passport.authenticate('jwt', { session: false }),
  util.checkRole([role.admin]),
  adminController.fetchUserProfile,
);

router.get(
  '/sessionList',
  passport.authenticate('jwt', { session: false }),
  util.checkRole([role.admin]),
  adminController.sessionList,
);

router.post(
  '/updateMentorRegistration',
  passport.authenticate('jwt', { session: false }),
  util.checkRole([role.admin]),
  adminController.updateMentorRegistration,
);

module.exports = router;
