var express = require('express');
var router = express.Router();
var Tv = require('../models/tv').Tv;

// Главная страница телевизоров
router.get('/', function(req, res, next) {
  res.send('Новый маршрутизатор для маршрутов, начинающихся с /tv');
});

/* Страница телевизора */
router.get('/:model', function(req, res, next) {

  Tv.findOne({ model: req.params.model }, function(err, tv) {
    if (err) return next(err);

    if (!tv) {
      return next(new Error('Нет такого телевизора'));
    }

    res.render('tv', {
      title: tv.title,
      brand: tv.brand,
      diagonal: tv.diagonal,
      price: tv.price,
      display_technology: tv.display_technology,
      features: tv.features,
      energy_class: tv.energy_class
    });
  });

});

module.exports = router;


module.exports = router;
