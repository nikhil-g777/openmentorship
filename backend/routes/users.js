var express = require('express');
var router = express.Router();

var userController = require('../controllers/userController');

router.post('/register', userController.registerUser);
router.put('/update/:_id', userController.updateUser);
router.get('/info/:_id', userController.userInfo);
router.get('/matches/:_id', userController.matches);

module.exports = router;
