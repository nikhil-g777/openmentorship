const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Token = new Schema(
    {
       refreshToken:String,
       linkedinId: String
    }
)

module.exports = mongoose.model('MentorshipToken', Token)