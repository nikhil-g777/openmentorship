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

router.post('/register', userController.registerUser);

router.post('/tempAuth/:_id', userController.tempAuth);

router.put(
  '/update/:_id',
  passport.authenticate('jwt', { session: false }),
  util.checkRole([role.mentee, role.mentor, role.admin]),
  userController.updateUser,
);

router.get(
  '/info/:_id',
  passport.authenticate('jwt', { session: false }),
  util.checkRole([role.mentee, role.mentor, role.admin]),
  userController.userInfo,
);

module.exports = router;
