require('dotenv').config({path:'../config'})
const User = require('../models/user')
const Token = require('../models/Tokens')
const axios = require('axios')
const queryString = require('query-string')
const jwt = require("jsonwebtoken")
const util = require('../lib/utils')



const linkedinAuth = axios.create({
    baseURL: 'https://www.linkedin.com/'
})

const linkedinApi = axios.create({
    baseURL: 'https://api.linkedin.com/'
})

let generateAccessToken = x => jwt.sign(x, process.env.ACCESS_TOKEN)
let generateRefreshToken = x => jwt.sign(x, process.env.REFRESH_TOKEN)


registerUser = (req, res) => {

       const body = req.body
   

    if(!body) {
        res.status(400).json({ success: false, error: 'request body is empty'})
    }

    if(!body.authCode) {
        res.status(400).json({success: false, error: 'auth code not present in body'})
    }

   

    const authUrl = queryString.stringifyUrl({
        url: '/oauth/v2/accessToken',
        query: {
            grant_type: 'authorization_code',
            code: body.authCode,
            redirect_uri: process.env.LINKEDIN_REDIRECT_URI,
            client_id: process.env.LINKEDIN_CLIENT_ID,
            client_secret: process.env.LINKEDIN_CLIENT_SECRET
        }
    })   
    const profileUrl = '/v2/me'
  
    linkedinAuth.post(authUrl) // exchange auth code for access token
    .then((response) => {
        
        linkedinApi.get(profileUrl, { // get user profile
            headers: {
                Authorization: `Bearer ${response.data.access_token}`
            }
        }).then((profileResponse) => {
            var userProfile = {
                firstName: profileResponse.data.localizedFirstName,
                lastName: profileResponse.data.localizedLastName,
                email: '123@gmail.com',
                linkedinId: profileResponse.data.id
            }

      

            User.findOne({linkedInId: userProfile.linkedInId})
                .then(user=>{
                    if(user) 
                        user = Object.assign(user, userProfile)
                    else User.create({userProfile})
                    
                    Token.findOne({linkedinId:user.linkedinId})
                    .then(token=>{
                            //if token isn't in our DB, store
                        if(!token) {
                            //encrypt information
                            const t = util.refreshToken(user.linkedinId)
                            Token.create({refreshToken:t, linkedinId:user.linkedinId})
                            //send the access token
                            const accessToken = util.accessToken(user.linkedinId)
                            res.cookie('accessToken', accessToken).json({success:true})
                        }
                        else {
                            //create an access token
                            const id = util.verifyToken(token.refreshToken)
                            //send the access token
                            const accessToken = util.accessToken(id.linkedinId)
                            res.cookie('accessToken', accessToken).json({success:true})
                        }
                    })
                    .catch(err=>console.log(err))
                   
                    
                    
                })
                .catch(err=>console.log(err))
            
     
        }).catch((error) => {
            console.log(error);
            res.send(error);
        })
    })
    .catch((error) => {
        console.log(error);
        res.send(error);
    })

}



updateUser = (req, res) => {
    const body = req.body

    if(!body) {
        res.status(400).json({ success: false, error: 'request body is empty'})
    }

    res.json({success: true})
}


auth = (req,res) =>{

    console.log("User authenticated")
    console.log("Welcome " + req.user.firstName)


}

module.exports = {
    registerUser,
    updateUser,
    auth
}