var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Use Cors middleware
const cors = require('cors')
app.use(cors())

// Use Mongo DB
var mongoose = require('mongoose');
// var uri = 'mongodb+srv://3100PJA0:WQslrDaD9bAGZZ5b@3100project.gbzxufi.mongodb.net/?retryWrites=true&w=majority'
var uri = 'mongodb+srv://3100PJA0:3100PJA0@3100project.gbzxufi.mongodb.net/?retryWrites=true&w=majority'
connect();

// Routers
app.use('/', indexRouter);
app.use('/users', usersRouter);

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



// connect to mongoDB
async function connect(){
  try {
    await mongoose.connect(uri)
    console.log('Connected to MongoDB')
  } catch (error){
    console.log(error)
  }
}



module.exports = app;
