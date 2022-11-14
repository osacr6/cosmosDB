var express = require('express');
var router = express.Router();

const VideoJuego = require('../controllers/videoJuegos.controller');
const controller = new VideoJuego();

/* GET home page. */
router.get('/', function(req, res, next) {
  controller.listVideoJuegos(({
    data
  }) => {
    res.render('index', {
      title: 'Ventas de Video Juegos',
      videoJuegos: data
    });
  })
});

module.exports = router;