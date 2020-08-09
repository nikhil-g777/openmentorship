const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');


const db = require('./db')

const indexRouter = require('./routes/index');
const userRouter = require('./routes/user-router');
const menteeRouter = require('./routes/mentee-router');
const mentorRouter = require('./routes/mentor-router');

const app = express();


// require('dotenv').config({path:__dirname+"/./config/.env"});
require('dotenv').config()


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors({origin:'http://localhost:3000', credentials:true}));


db.on('error', console.error.bind(console, 'MongoDB connection error:'))


app.use('/', indexRouter);
app.use('/users', userRouter);
app.use('/mentees', menteeRouter);
app.use('/mentors', mentorRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404))
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

app.listen(process.env.APP_PORT, () => console.log('Server listening on port ' + process.env.APP_PORT + '!'))

module.exports = app;
