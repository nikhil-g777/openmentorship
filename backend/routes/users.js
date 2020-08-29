const cookieParser = require('cookie-parser');
const express = require('express');
const router = express.Router();
const passport = require('passport')
require('../config/passportJWT')(passport);

const userController = require('../controllers/userController');

router.use(passport.initialize());
router.use(cookieParser());

router.post('/register', userController.registerUser);
router.put('/update/:_id', passport.authenticate('jwt', {session:false}), userController.updateUser);
router.get('/info/:_id', passport.authenticate('jwt', {session:false}), userController.userInfo);
router.get('/matches/:_id', passport.authenticate('jwt', {session:false}), userController.matches);

module.exports = router;
