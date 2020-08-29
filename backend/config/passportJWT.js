const fs = require('fs')
const JwtStrategy = require('passport-jwt').Strategy
const PUBLIC_KEY = fs.readFileSync(__dirname + "/../keys/public.pem")
const User = require('../models/user')
const Token = require('../models/token')

const cookieExtractor = (req) =>{
    console.log(req.headers)
    let token = null;
    if (req && req.cookies)
    {
        token = req.cookies['accessToken']; //authorization Bearer token
       
    }
    
    return token;
}

const options = {
    secretOrKey : PUBLIC_KEY,
    jwtFromRequest : cookieExtractor,
    algorithms: "RS256"
}

const verify = (payload, done) =>{
    User.findOne({linkedinId:payload.linkedinId})
    .then(u=>{
        if(u) return done(null,u)
        else return done(null,false)
    })
    .catch(err => done(err))
}

const strategy = new JwtStrategy(options,verify)

module.exports = (passport) => passport.use(strategy)