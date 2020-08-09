const jwt = require('jsonwebtoken')
const fs = require('fs')

const PUBLIC = fs.readFileSync(__dirname + "/../keys/public.pem")
const PRIVATE = fs.readFileSync(__dirname + "/../keys/private.pem")

module.exports = {
    refreshToken: (linkedinId)=>{
        return jwt.sign({linkedinId}, PRIVATE, {algorithm:"RS256"})
    },

    accessToken: (linkedinId)=>{
        return jwt.sign({linkedinId}, PRIVATE, {algorithm:"RS256"})
    },
    verifyToken: (token)=>{
        if(token !== undefined){
        return jwt.verify(token, PUBLIC, {algorithm:"RS256"})
        }
        
        else return undefined
    }
}