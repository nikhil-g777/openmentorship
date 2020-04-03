const express = require('express')
const MenteeCtrl = require('../controllers/mentee-ctrl')
const router = express.Router()
const passport = require('passport')


router.get("/login", (req,res)=>{
    res.send("login")
})

router.get("/logout", (req,res)=>{
    res.send("logout")
})

router.get("/auth/linkedin",  
passport.authenticate('linkedin'))

router.get('/auth/linkedin/redirect', 
passport.authenticate('linkedin'), (req,res)=>{
    res.redirect("http://localhost:4000")
});



module.exports = router