const mongoose = require('mongoose')
require('dotenv').config({path:__dirname+"/../config/.env"});

// console.log(process.env.MONGODB_URI)
//mongodb+srv://joemart:<password>@cluster0-lqudq.mongodb.net/<dbname>?retryWrites=true&w=majority

mongoose
    .connect(process.env.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
    .catch(err => {
        console.error('Connection Error', err.message)
    })

const db = mongoose.connection

module.exports = db