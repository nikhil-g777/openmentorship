const mongoose = require('mongoose')
require('dotenv').config({path:__dirname+"/../config/.env"});

// console.log(process.env.MONGODB_URI)

mongoose
<<<<<<< HEAD
    .connect(process.env.MONGODB_CONNECTION_URL + '/openmentorship', {useNewUrlParser: true})
=======
    .connect(process.env.MONGODB_CONNECTION_URL + '/openmentorship', {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
>>>>>>> 58b55733aa98f7a3ba428c6fd5c668539a4378e5
    .catch(err => {
        console.error('Connection Error', err.message)
    })

const db = mongoose.connection

module.exports = db