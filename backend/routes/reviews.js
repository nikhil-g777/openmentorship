const cookieParser = require('cookie-parser');
const express = require('express');

const router = express.Router();
const passport = require('passport');
require('../config/passportJWT')(passport);

const reviewController = require('../controllers/reviewController');
const util = require('../lib/utils');
const role = require('../lib/role');

router.use(passport.initialize());
router.use(cookieParser());

// Get List of Sessions
router.get(
  '/getReviews',
  passport.authenticate('jwt', { session: false }),
  util.checkRole([role.mentee, role.mentor, role.admin]),
  reviewController.getReviews,
);

// Add a review
router.post(
  '/addReview',
  passport.authenticate('jwt', { session: false }),
  util.checkRole([role.mentee, role.mentor, role.admin]),
  reviewController.addReview,
);

// Get a review
router.get(
  '/getReview',
  passport.authenticate('jwt', { session: false }),
  util.checkRole([role.mentee, role.mentor, role.admin]),
  reviewController.getReview,
);

module.exports = router;
