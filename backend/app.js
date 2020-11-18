/* eslint no-unused-vars: 0 */

const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const createError = require('http-errors');
const fs = require('fs');
const https = require('https');
const logger = require('morgan');
const path = require('path');

require('dotenv-flow').config();

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

const db = require('./db');

const corsConfig = {
  origin: ['http://localhost:3010', 'http://www.openmentorship.com:3010'],
  credentials: true,
};

app.use(cors(corsConfig));
app.options('*', cors(corsConfig));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  console.log(req);
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

if (process.env.NODE_ENV == 'local') {
  app.listen(process.env.APP_PORT, () => {
    console.log(`Server listening on port ${process.env.APP_PORT}!`);
  });
} else {
  const key = fs.readFileSync('./certs/private.key');
  const cert = fs.readFileSync('./certs/certificate.crt');
  const options = {
    key,
    cert,
  };

  const server = https.createServer(options, app);

  server.listen(process.env.APP_PORT, () => {
    console.log(`Server listening on port ${process.env.APP_PORT}!`);
  });
}

module.exports = app;
