const express = require('express');
const router = express.Router();
const Tv = require('../models/tv');

router.get('/', async (req, res, next) => {
    try {
        const tvs = await Tv.find();

        res.render('index', {
            title: 'Главная',
            menu: tvs
        });
    } catch (err) {
        next(err);
    }
});


/* GET home page. */
router.get('/', async function(req, res, next) {
  try {
    const menu = await Tv.find({}, { _id: 0, title: 1, model: 1 });

    // 🔹 ЗАПИСЬ COOKIE
    res
      .cookie('greeting', 'Hi!!!')
      .render('index', {
        title: 'TV Catalog',
        menu: menu
      });

  } catch (err) {
    next(err);
  }
});

console.log(Tv);
module.exports = router;
