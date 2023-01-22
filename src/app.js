var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//for hosting on Netlify
const serverless = require('serverless-http');

var indexRouter = require('./routes/index');

var app = express();

// view engine setup
//we tell Node.js what the source of our templates is. 
app.set('views', path.join(__dirname, 'views'));

// tells Node.js what engine to use.
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//tells Node.js that we store the static assets in a directory named public.
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, "dist")));

app.use('/', indexRouter);

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
    res.render('error', {
        error: err.message
    });
});


app.listen(9000, (req, res) => {
    console.log("Server is running at port 9000")
});

app.use(`/.netlify/functions/api`, indexRouter);

module.exports = app;

module.exports.handler = serverless(app)
