var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser')
var logger = require('morgan');
var mongoose = require("mongoose");
require('dotenv').config();
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var authRouter = require('./routes/auth');


var app = express();

// MongoDB setup
mongoose.connect(process.env.MONGODB_URI).then(
  () => { /** ready to use. The `mongoose.connect()` promise resolves to undefined. */ },
  err => {
    console.log(err); /** handle initial connection error */
  }
);


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// app.engine('html', require('ejs').renderFile);
app.use(express.static(path.join(__dirname, 'public')));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Routes configuration
app.use('/', indexRouter);
app.use('/', authRouter);
// app.use('/', auth-routes);
app.use('/users', usersRouter);
// const authRoutes = require('./routes/auth-routes');

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

module.exports = app;
