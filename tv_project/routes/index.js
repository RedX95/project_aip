var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* Страница Samsung */
router.get('/samsung', function(req, res, next) {
  res.render('tv_model', {
    title: "Телевизоры Samsung",
    picture: "/images/samsung.jpg",
    desc: "Ведущий производитель телевизоров с технологиями QLED, Neo QLED и микроLED"
  });
});

/* Страница LG */
router.get('/lg', function(req, res, next) {
  res.render('tv_model', {
    title: "Телевизоры LG",
    picture: "/images/lg.jpg",
    desc: "Инновационные OLED и NanoCell телевизоры с технологией webOS"
  });
});

/* Страница Sony */
router.get('/sony', function(req, res, next) {
  res.render('tv_model', {
    title: "Телевизоры Sony",
    picture: "/images/sony.jpg",
    desc: "Телевизоры BRAVIA с процессором Cognitive Processor XR и технологией Acoustic Surface"
  });
});

/* Страница Philips */
router.get('/philips', function(req, res, next) {
  res.render('tv_model', {
    title: "Телевизоры Philips",
    picture: "/images/philips.jpg",
    desc: "Телевизоры с технологией Ambilight для иммерсивного просмотра"
  });
});

/* Страница TCL */
router.get('/tcl', function(req, res, next) {
  res.render('tv_model', {
    title: "Телевизоры TCL",
    picture: "/images/tcl.jpg",
    desc: "Доступные телевизоры с технологиями Mini-LED и QLED"
  });
});

module.exports = router;