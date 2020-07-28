const mongoose = require('mongoose')
const Schema = mongoose.Schema

const WorkExperience = new Schema(
    {
        title: {type: String, required: true},
        company: {type: String, required: true},
        location: {type: Object, required: true},
        industry: {type: String, required: true},
        startDate: {type: Date, required: true},
        currentlyWorking: {type: Boolean, required: true, default: false},
        endDate: {type: Date}
    }
)

const User = new Schema(
    {
        firstName: {type: String, required: true},
        lastName: {type: String, required: true},
        email: {type: String, required: true},
        userType: {type: String, required: true},
        linkedInId: {type: String, required: true},
        WorkExperiences: {type: [WorkExperience], default: []},
        skills: {type: [String], default: []},
        interests: {type: [String], default: []},
        needs: {type: Object, default: {}},
        communicationFrequency: {type: String},
        socialLinks: {type: Object,default: {}},
        active: {type: Boolean, default: false}
    },
    {
        timestamps: true
    }
)


module.exports = mongoose.model('user', User)