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

    //cookies are being sent, reactjs is not receiving them
    //https://www.youtube.com/watch?v=7C3rPbXmm44

    // res.cookie('mytest','what', {maxAge:1000*60}).json({test:'test'}).end()
    const body = req.body
    //Grab the auth code

    if(!body) {
        res.status(400).json({ success: false, error: 'request body is empty'})
    }

    if(!body.authCode) {
        res.status(400).json({success: false, error: 'auth code not present in body'})
    }

    // console.log(body);

    const authUrl = queryString.stringifyUrl({
        url: '/oauth/v2/accessToken',
        query: {
            grant_type: 'authorization_code',
            code: body.authCode,
            redirect_uri: process.env.LINKEDIN_REDIRECT_URI,
            client_id: process.env.LINKEDIN_CLIENT_ID,
            client_secret: process.env.LINKEDIN_CLIENT_SECRET
        }
    })   //=> /oauth/v2/accessToken?grant_type=authorization_code&code=body.authCode...
    
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
                        
                    ///   
                    Token.find({})
                    .then(token=>{
                        //check if array isn't empty
                        let tokenExist = false
                        if(token.length !== 0){
                            tokenExist = token.some(t=>{
                           //check if token is in the DB
                           let id = util.verifyToken(t.refreshToken)
                           if (id == undefined) return res.status(401)
                           if(id.linkedinId === user.linkedinId)
                               {
                                   
                                   const accessToken = util.accessToken(id.linkedinId)
                                   res.cookie('accessToken', accessToken)
                                   .json({success:true})
                                   return true
                               }
                               else return false
                        })
                        }

                        //create token if not in DB
                        if(tokenExist == false)
                        {
                            console.log(user.linkedinId)
                            //sign jwt refresh token
                            let t = util.refreshToken(user.linkedinId)
                            console.log(t)
                            Token.create({refreshToken:t})
                            const accessToken = util.accessToken(user.linkedinId)
                            console.log(accessToken)
                            res.cookie('accessToken', accessToken).json({success:true})
                        }
                    })
                    .catch(err=>console.log(err))
                    ///
                    // res
                    // .json({
                    //     id: user._id,
                    //     linkedInId: user.linkedinId,
                    //     access_token: response.data.access_token})
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

    console.log(body);
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