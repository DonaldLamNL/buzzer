var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var accountRouter = require('./routes/account');
var buzzesRouter = require('./routes/buzzes');
var commentsRouter = require('./routes/comments');
var adminRouter = require('./routes/admin');
var categoriesRouter = require('./routes/categories');
var hiveRouter = require('./routes/hive');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'dist')));

// Use Cors middleware
const cors = require('cors')
app.use(cors())

// Use MongoDB
const mongoose = require('mongoose');
const { Users, Buzzes, Comments } = require('./databaseSchema');
var uri = 'mongodb+srv://3100PJA0:3100PJA0@3100project.gbzxufi.mongodb.net/Buzzer?retryWrites=true&w=majority'
connect();

app.set('maxHttpHeaderSize', 1000000);

// Routers
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/account', accountRouter);
app.use('/buzzes', buzzesRouter);
app.use('/comments', commentsRouter);
app.use('/admin', adminRouter);
app.use('/categories', categoriesRouter);
app.use('/hive', hiveRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

// connect to mongoDB
async function connect() {
    try {
        await mongoose.connect(uri)
        console.log('Connected to MongoDB')
        // testCreate();
    } catch (error) {
        console.log(error)
    }
}

module.exports = app;
