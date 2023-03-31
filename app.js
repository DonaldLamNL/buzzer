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

// 路由之前配置 cors 中間件，以解決跨域問題
const cors = require('cors')
app.use(cors())

// Router
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

// Mongo DB
var mongoose = require('mongoose');
var uri = 'mongodb+srv://3100PJA0:WQslrDaD9bAGZZ5b@3100project.gbzxufi.mongodb.net/?retryWrites=true&w=majority'
// connect to mongoDB
async function connect(){
  try {
    await mongoose.connect(uri)
    console.log('Connected to MongoDB')
  } catch (error){
    console.log(error)
  }
}
connect();


module.exports = app;
