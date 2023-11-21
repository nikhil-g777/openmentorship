const cookieParser = require('cookie-parser');
const express = require('express');

const router = express.Router();
const passport = require('passport');

require('../config/passportJWT').passportJWT(passport);

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
  util.convertPaginationQueryParamsToInt(),
  passport.authenticate('jwt', { session: false }),
  util.checkRole([role.admin]),
  adminController.userList,
);

router.get(
  '/userSearch',
  util.convertPaginationQueryParamsToInt(),
  passport.authenticate('jwt', { session: false }),
  util.checkRole([role.admin]),
  adminController.userSearch,
);

router.get(
  '/userProfile',
  passport.authenticate('jwt', { session: false }),
  util.checkRole([role.admin]),
  adminController.fetchUserProfile,
);

router.get(
  '/sessionList',
  util.convertPaginationQueryParamsToInt(),
  passport.authenticate('jwt', { session: false }),
  util.checkRole([role.admin]),
  adminController.sessionList,
);

router.get(
  '/sessionSearch',
  util.convertPaginationQueryParamsToInt(),
  passport.authenticate('jwt', { session: false }),
  util.checkRole([role.admin]),
  adminController.sessionSearch,
);

router.post(
  '/updateMentorRegistration',
  passport.authenticate('jwt', { session: false }),
  util.checkRole([role.admin]),
  adminController.updateMentorRegistration,
);

module.exports = router;
