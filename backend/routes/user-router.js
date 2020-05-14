const express = require('express')

const UserCtrl = require('../controllers/user-ctrl')

const router = express.Router()

router.post('/register', UserCtrl.registerUser)
router.put('/update/:id', UserCtrl.updateUser)


module.exports = router