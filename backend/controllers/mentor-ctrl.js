const Mentor = require('../models/mentor')
const axios = require('axios')
const queryString = require('query-string');

const linkedinApi = axios.create({
    baseURL: 'https://www.linkedin.com/oauth/v2/'
})

getAccessToken = (req, res) => {
    const body = req.body;
    
    if(!body) {
        res.status(400).json({success: false, error: 'request body is empty'})
    }

    console.log(body)

    const queryUrl = queryString.stringifyUrl({
        url: '/accessToken',
        query: {
            grant_type: 'authorization_code',
            code: body.code,
            redirect_uri: process.env.LINKEDIN_REDIRECT_URI,
            client_id: process.env.LINKEDIN_CLIENT_ID,
            client_secret: process.env.LINKEDIN_CLIENT_SECRET
        }
    })

    linkedinApi.post(queryUrl)
    .then((data) => {
        console.log(data)
    })
    .catch((error) => {
        console.log(error)
    })

    res.json({})
}

createMentor = (req, res) => {
    const body = req.body

    if(!body) {
        res.status(400).json({success: false, error: 'request body is empty'})
    }

    const mentor = new Mentor(body)

    if(!mentor) {
        res.status(400).json({success: false, error: err})
    }

    mentor
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: mentor._id,
                message: 'Mentor created'
            })
        })
        .catch((error) => {
            return res.status(400).json({
                success: false,
                error,
                message: 'Mentor not created'
            })
        })
}

module.exports = {
    getAccessToken,
    createMentor
}

