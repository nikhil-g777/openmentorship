var express = require('express');
var router = express.Router();

var userController = require('../controllers/userController');

router.post('/register', userController.registerUser);
router.put('/update', userController.updateUser);

module.exports = router;
