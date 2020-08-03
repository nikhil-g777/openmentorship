const mongoose = require('mongoose')

mongoose
    .connect(process.env.MONGODB_CONNECTION_URL + '/openmentorship', {useNewUrlParser: true})
    .catch(err => {
        console.error('Connection Error', err.message)
    })

const db = mongoose.connection

module.exports = db