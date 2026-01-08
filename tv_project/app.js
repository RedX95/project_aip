var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');

// ПОДКЛЮЧЕНИЕ К БАЗЕ ДАННЫХ
mongoose.connect('mongodb://localhost:27017/tv_project')
.then(() => {
  console.log('MongoDB подключена успешно');
})
.catch(err => {
  console.error('Ошибка подключения к MongoDB:', err.message);
  process.exit(1);
});

// ПОДКЛЮЧЕНИЕ МОДЕЛЕЙ
require('./models/tv');

var indexRouter = require('./routes/index');
var tvRouter = require('./routes/tv');

var app = express();

// НАСТРОЙКА ШАБЛОНОВ
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// MIDDLEWARE
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// РОУТЫ
app.use('/', indexRouter);
app.use('/tv', tvRouter);

// ОБРАБОТКА 404
app.use(function(req, res, next) {
  next(createError(404));
});

// ОБРАБОТКА ОШИБОК
app.use(function(err, req, res, next) {
  // Устанавливаем локальные переменные для шаблона
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Рендерим страницу ошибки
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;