const cookieParser = require('cookie-parser');
const express = require('express');

const router = express.Router();
const passport = require('passport');

require('../config/passportJWT')(passport);

const userController = require('../controllers/userController');
const util = require('../lib/utils');
const role = require('../lib/role');

router.use(passport.initialize());
router.use(cookieParser());

router.post('/login', userController.loginUser);

// router.post('/register', userController.registerUser);

router.get('/confirmRegistration', userController.confirmRegistration);

router.post('/tempAuth/:_id', userController.tempAuth);

router.put(
  '/update',
  passport.authenticate('jwt', { session: false }),
  util.checkRole([role.mentee, role.mentor, role.admin]),
  userController.updateUser,
);

router.get(
  '/info',
  passport.authenticate('jwt', { session: false }),
  util.checkRole([role.mentee, role.mentor, role.admin]),
  userController.userInfo,
);
router.get(
  '/matches',
  passport.authenticate('jwt', { session: false }),
  util.checkRole([role.mentee, role.mentor, role.admin]),
  userController.matches,
);

router.get(
  '/chatToken',
  passport.authenticate('jwt', { session: false }),
  util.checkRole([role.mentee, role.mentor, role.admin]),
  userController.twilioToken,
);

module.exports = router;
