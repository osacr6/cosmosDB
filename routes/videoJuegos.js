var express = require('express');
var router = express.Router();

const VideoJuego = require('../controllers/videoJuegos.controller');
const controller = new VideoJuego();

router.get('/list', function(req, res, next) {
  controller.listVideoJuegos(({
    data
  }) => {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(data));
  })
});

router.post('/create', function(req, res, next) {
  console.log(req.body);
  controller.addVideoJuego(req.body, ({status, message}) => {
    console.log(status, message);
    res.redirect('/');
  });
});

router.post('/update', function(req, res, next) {
  console.log(req.body);
  controller.updateVideoJuego(req.body, ({status, message}) => {
    console.log(status, message)
    res.redirect('/');
  });
});

router.get('/delete/:id', function(req, res, next) {
  const id = req.params.id;
  console.log('delete: ', id)
  controller.deleteVideoJuego(id, ({status, message}) => {
    console.log(status, message)
    res.redirect('/');
  });
});

module.exports = router;
