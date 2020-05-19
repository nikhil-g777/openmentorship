const User = require('../models/user')
const axios = require('axios')
const queryString = require('query-string');

const linkedinAuth = axios.create({
    baseURL: 'https://www.linkedin.com/'
})

const linkedinApi = axios.create({
    baseURL: 'https://api.linkedin.com/'
})

registerUser = (req, res) => {
    const body = req.body

    if(!body) {
        res.status(400).json({ success: false, error: 'request body is empty'})
    }

    if(!body.authCode) {
        res.status(400).json({success: false, error: 'auth code not present in body'})
    }

    console.log(body);


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

            // Check if user exists and save / update accordingly

            User.findOne({linkedInId: userProfile.linkedInId}, (error, user) => {
                if(error) {
                    console.log(err)
                } else if (user) {
                    user = Object.assign(user, userProfile)
                } else {
                    user = new User(userProfile);
                }

                console.log(user);


                user.save((error) => {
                    console.log(error)
                })
                res.json({
                    id: user._id,
                    linkedInId: user.linkedInId,
                    access_token: response.data.access_token
                });
            })
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

module.exports = {
    registerUser,
    updateUser
}