var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


/* Страница Samsung */
router.get('/samsung', function(req, res, next) {
  res.send("<h1>Страница телевизоров Samsung</h1>")
});

/* Страница LG */
router.get('/lg', function(req, res, next) {
  res.send("<h1>Страница телевизоров LG</h1>")
});

/* Страница Sony */
router.get('/sony', function(req, res, next) {
  res.send("<h1>Страница телевизоров Sony</h1>")
});

/* Страница Philips */
router.get('/philips', function(req, res, next) {
  res.send("<h1>Страница телевизоров Philips</h1>")
});

/* Страница TCL */
router.get('/tcl', function(req, res, next) {
  res.send("<h1>Страница телевизоров TCL</h1>")
});

module.exports = router;
