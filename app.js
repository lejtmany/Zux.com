var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var localVars = require('./local_vars');
var mongo = require('mongodb');
var monk = require('monk');
var db = monk(localVars.dbConnection);
var passport = require('passport');
var session = require('express-session');
var app = express();
require('./config/passport')(passport);
var routes = require('./routes/index');
var applicants = require('./routes/applicants');
var login = require('./routes/login')(passport);


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static('public'));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));

//set up sessions
app.use(session({secret:'big secret stuff',
                 duration: 5 * 60 *1000}));
app.use(passport.initialize());
app.use(passport.session());

// Make our db accessible to our router
app.use(function(req,res,next){
    req.db = db;
    next();
});

app.use(function(req,res,next){
    res.header('Access-Control-Allow-Credentials', "true");
    next();
});

app.use('/', routes);
app.use('/applicants', applicants);
app.use('/login', login);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
