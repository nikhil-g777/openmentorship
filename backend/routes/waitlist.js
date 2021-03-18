const cookieParser = require('cookie-parser');
const express = require('express');

const router = express.Router();

const waitlistController = require('../controllers/waitlistController');

router.use(cookieParser());

// Get List of Sessions
router.post('/register', waitlistController.register);

module.exports = router;
