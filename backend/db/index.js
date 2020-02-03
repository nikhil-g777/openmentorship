const mongoose = require('mongoose')

mongoose
    .connect('mongodb://127.0.0.1:27017/openmentorship', {useNewUrlParser: true})
    .catch(err => {
        console.error('Connection Error', err.message)
    })

const db = mongoose.connection

module.exports = db