var express = require('express');
var router = express.Router();

// Главная страница телевизоров
router.get('/', function(req, res, next) {
  res.send('Новый маршрутизатор для маршрутов, начинающихся с /tv');
});

// Страница конкретного телевизора по параметру model
router.get('/:model', function(req, res, next) {
  res.send(req.params.model);
});

module.exports = router;
