// load .env config values
require('dotenv').config();

(function(env){
  if(typeof env.CTA_KEY === 'undefined') throw new Error('CTA_KEY: Specify the CTA Developer API key.');
  if(typeof env.DARKSKY_KEY === 'undefined') throw new Error('DARKSKY_KEY: Specify the API key for Dark Sky API.');
  if(typeof env.LAT_LONG === 'undefined') throw new Error('LAT_LONG: Specify the latitude and longitude of the location you want weather information for.');
})(process.env);

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var api = require('./routes/api');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'dist')));

app.use(function(req, res, next){
    req.city_ids      = process.env.CITY_IDS;
    req.darksky_key   = process.env.DARKSKY_KEY;
    req.lat_long      = process.env.LAT_LONG;
    res.locals.env    = process.env;
    res.locals.pretty = (app.get('env') === 'development');
    next();
});

app.use('/', index);
app.use('/api', api);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers
app.use(function logErrors(err, req, res, next) {
  console.error(err.stack);
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error
  res.status(err.status || 500);
  if(req.headers["content-type"] == 'application/json' || req.headers["accept"] == 'application/json'){
    res.json({message: res.locals.message, error: res.locals.error});
  } else {
    res.render('error');
  }
});

module.exports = app;
