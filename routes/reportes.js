var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('reportes', {
    title: 'reportes sobre vntas de Video Juegos',
    videoJuegos: null
  });
});

router.get('/ventas', function(req, res, next) {
  res.render('reportes', {
    title: 'reportes sobre vntas de Video Juegos',
    videoJuegos: null
  });
});

module.exports = router;