const express = require('express');
const router = express.Router();
const Tv = require('../models/tv');

/* GET главная страница. */
router.get('/', async function(req, res, next) {
  try {
    // Получаем все телевизоры для меню и главной страницы
    const tvs = await Tv.find({}, 'title nick brand image price diagonal')
      .sort({ brand: 1, price: 1 });
    
    // Группируем телевизоры по брендам
    const tvsByBrand = {};
    tvs.forEach(tv => {
      if (!tvsByBrand[tv.brand]) {
        tvsByBrand[tv.brand] = [];
      }
      tvsByBrand[tv.brand].push(tv);
    });
    
    // Статистика
    const stats = {
      total: tvs.length,
      brands: Object.keys(tvsByBrand).length,
      minPrice: Math.min(...tvs.map(tv => tv.price)),
      maxPrice: Math.max(...tvs.map(tv => tv.price))
    };
    
    res.render('index', { 
      title: 'Каталог телевизоров - Главная',
      menu: tvs,
      tvsByBrand: tvsByBrand,
      stats: stats
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;