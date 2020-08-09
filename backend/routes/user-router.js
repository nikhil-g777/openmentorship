const express = require('express')

const UserCtrl = require('../controllers/user-ctrl')
const cookieParser = require('cookie-parser')
const router = express.Router()
const passport = require('passport')
router.use(cookieParser())
require('../config/passportJWT')(passport)
router.use(passport.initialize())
//auth links
//https://docs.microsoft.com/en-us/linkedin/shared/authentication/authorization-code-flow
//https://softwareontheroad.com/nodejs-jwt-authentication-oauth/
let authFunc = (req,res, next) =>{
    // const authCode = req.app.locals.authCode;
    //Check if token is in Token collection
        //no
            //res.sendStatus(403)
        //yes
            //next()
    next()
}

router.post('/register',  UserCtrl.registerUser)
//route to generate new access token
router.get('/auth', passport.authenticate('jwt', {session:false}), UserCtrl.auth)
router.put('/update/:id',  UserCtrl.updateUser)


module.exports = router