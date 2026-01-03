var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var routes = require('./routes/index');
var users = require('./routes/users');
var tvRouter = require('./routes/tv');
var session = require('express-session');

// ПОДКЛЮЧЕНИЕ БАЗЫ ДАННЫХ 
mongoose
  .connect('mongodb://localhost/tv_project')
  .then(() => {
    console.log('MongoDB подключена');
  })
  .catch(err => {
    console.error('Ошибка подключения MongoDB:', err.message);
  });

//  ПОДКЛЮЧЕНИЕ МОДЕЛЕЙ 
require('./models/tv').Tv;

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var tvRouter = require('./routes/tv');

var app = express();

//  НАСТРОЙКА ШАБЛОНОВ 
app.engine('ejs', require('ejs-locals'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// СЕССИЯ ТУТ
app.use(session({
  secret: 'LgIsTv',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60 * 1000 }
}));

// статика
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'bower_components')));

// роуты
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/tv', tvRouter);


//  404 
app.use(function(req, res, next) {
  next(createError(404));
});

//  ОБРАБОТКА ОШИБОК 
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
