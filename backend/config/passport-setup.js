const passport = require("passport")
const LinkedInStrategy = require("passport-linkedin-oauth2").Strategy
const keys = require("./keys")
const Mentee = require("../models/mentee")

passport.serializeUser((user, done)=> {
  done(null, user.id);
});

passport.deserializeUser((id, done)=> {
  
  Mentee.findOne({id}).then((err, user)=> {
    done(err, user);
  })
  .catch(e=>console.log(e))
  ;
});

passport.use(new LinkedInStrategy({
    clientID: keys.LINKEDIN_ID,
    clientSecret: keys.LINKEDIN_SECRET,
    callbackURL: "http://localhost:3000/mentees/auth/linkedin/redirect",
    scope: ['r_emailaddress', 'r_liteprofile']
  }, function(accessToken, refreshToken, profile, done) {

    Mentee.findOne({id:profile.id})
    .then(currentUser=>{
      if(currentUser){
        console.log("User already created:" + currentUser)
        done(null, currentUser) 
      } 
      else {
        Mentee.create({
      firstName: profile.name.givenName,
      lastName: profile.name.familyName,
      email: profile.emails[0].value,
      id: profile.id
    }).then(newUser=>{done(null,newUser)}) 
  
  }})}))

  
    


