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
console.log(Tv);
module.exports = router;
