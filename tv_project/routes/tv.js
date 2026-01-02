const express = require('express');
const router = express.Router();
const Tv = require('../models/tv');  

router.get('/:model', async (req, res, next) => {
    try {
        const tv = await Tv.findOne({ model: req.params.model });

        if (!tv) return next(new Error('Нет такого телевизора'));

        const menu = await Tv.find({}, { _id: 0, title: 1, model: 1 });

        res.render('tv_model', {
            title: tv.title,
            picture: '/images/tv.png',
            desc: `
Бренд: ${tv.brand}
Диагональ: ${tv.diagonal}"
Цена: ${tv.price} ₽
Технология: ${tv.display_technology}
Класс энергопотребления: ${tv.energy_class}
`,
            menu: menu
        });
    } catch (err) {
        next(err);
    }
});

module.exports = router;
