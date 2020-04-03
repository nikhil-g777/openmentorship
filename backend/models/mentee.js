const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Mentee = new Schema(
    {
        firstName: {type: String, required: true},
        lastName: {type: String, required: true},
        email: {type: String, required: true}
        ,id: {type: String, required: true}
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('mentee', Mentee)