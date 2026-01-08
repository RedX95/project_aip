const express = require('express');
const router = express.Router();
const Tv = require('../models/tv');

/* GET страница телевизора по nick. */
router.get('/:nick', async function(req, res, next) {
  try {
    // Находим телевизор по nick
    const tv = await Tv.findOne({ nick: req.params.nick });
    
    if (!tv) {
      const err = new Error('Телевизор не найден');
      err.status = 404;
      throw err;
    }
    
    // Получаем все телевизоры для меню
    const menu = await Tv.find({}, 'title nick brand')
      .sort({ brand: 1, title: 1 });
    
    // Получаем другие телевизоры того же бренда (рекомендации)
    const similarTvs = await Tv.find({
      brand: tv.brand,
      nick: { $ne: tv.nick } // исключаем текущий телевизор
    }, 'title nick image price')
      .limit(3)
      .sort({ price: 1 });
    
    res.render('tv', {
      title: tv.title,
      tv: tv,
      menu: menu,
      similarTvs: similarTvs
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;