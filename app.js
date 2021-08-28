var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
const ejs = require('ejs');

const checkDuplicateUsername = require("./middlewares/verifySignUp");
const controller = require("./middlewares/auth.controller");

var indexRouter = require('./routes/index');
var searchRouter = require('./routes/search');
var aboutRouter = require('./routes/about');
var adminRouter = require('./routes/admin');
var infoRouter = require('./routes/info');
var loginRouter = require('./routes/login');
var subscribeRouter = require('./routes/subscribe');
var testRouter = require('./routes/test');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/public', express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect('mongodb+srv://admin1:0123456789@cluster0.zv3pu.mongodb.net/Cosmetic?retryWrites=true&w=majority',
  {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex:true,
      useFindAndModify: false
  },
  (err) => {
      if (!err) {
          console.log('Connect to database successfully');
      }
      else {
          console.log('Connect to database failed');
      }
  });
app.use('/', indexRouter);
app.use('/search', searchRouter);
app.use('/about', aboutRouter);
app.use('/admin', adminRouter);
app.use('/info', infoRouter);
app.use('/login',loginRouter);
app.use('/subscribe',subscribeRouter);
app.use('/test',testRouter);


app.use(function(req, res, next) {
  res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
});

app.post("/signin", controller.signin);

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

