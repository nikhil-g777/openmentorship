const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

//database
const db = require('./db')
// const mongoose = require("mongoose")

//routes
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const menteeRouter = require('./routes/mentee-router');
const mentorRouter = require('./routes/mentor-router');

const keys = require("./config/keys")
const app = express();
//Header
const session = require('express-session')
const cookieSession = require("cookie-session")
const cors = require("cors")

// mongoose.connect(keys.MONGODB_URI,  { useNewUrlParser: true , useUnifiedTopology: true },()=>{
//   console.log("CONNECTED TO THE CLUSTER!!!!!!!!!!!!")
// })

const passport = require('passport')
const passportSetup = require('./config/passport-setup')

const port = process.env.port || 3000;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//cors
app.use(cors())
//parse cookies
app.use(
  cookieSession({
  name:"session",
  keys: [keys.COOKIE_KEY]
}))

app.use(passport.initialize())
app.use(session({secret: 'keyboard cat',
resave: false,
saveUninitialized: true,
cookie: { secure: true }}))

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

db.on('error', console.error.bind(console, 'MongoDB connection error:'))




// routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/mentees', menteeRouter);
app.use('/mentors', mentorRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(port, () => console.log('Server listening on port ' + port + '!'))

module.exports = app;
