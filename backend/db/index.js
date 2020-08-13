const mongoose = require('mongoose')
require('dotenv').config({path:__dirname+"/../config/.env"});

// console.log(process.env.MONGODB_URI)

mongoose
    .connect(process.env.MONGODB_CONNECTION_URL + '/openmentorship', {useNewUrlParser: true})
    .catch(err => {
        console.error('Connection Error', err.message)
    })

const db = mongoose.connection

module.exports = db