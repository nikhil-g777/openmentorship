const express = require('express')

const UserCtrl = require('../controllers/user-ctrl')
const cookieParser = require('cookie-parser')
const router = express.Router()
const passport = require('passport')
router.use(cookieParser())
require('../config/passportJWT')(passport)
router.use(passport.initialize())

router.post('/register',  UserCtrl.registerUser)
//add passport.authenticate('jwt', {session:false}) as middleware for authentication
router.get('/auth', passport.authenticate('jwt', {session:false}), UserCtrl.auth)
router.put('/update/:id',  UserCtrl.updateUser)

module.exports = router