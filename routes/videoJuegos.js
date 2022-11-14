var express = require('express');
var router = express.Router();

const VideoJuego = require('../controllers/videoJuegos.controller');
const controller = new VideoJuego();

router.post('/create', function(req, res, next) {
  console.log(req.body);
  controller.create(req.body, ({status, message}) => {
    console.log(status, message);
    res.redirect('/');
  });
});

router.post('/update', function(req, res, next) {
  console.log(req.body);
  controller.update(req.body, ({status, message}) => {
    console.log(status, message)
    res.redirect('/');
  });
});

router.get('/delete/:id', function(req, res, next) {
  const id = req.params.id;
  console.log('delete: ', id)
  controller.delete(id, ({status, message}) => {
    console.log(status, message)
    res.redirect('/');
  });
});

module.exports = router;
