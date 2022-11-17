var express = require('express');
var router = express.Router();

const Ubicaciones = require('../controllers/ubicaciones.controller');
const controller = new Ubicaciones();

/* GET Ventas page. */
router.get('/', function(req, res, next) {
    res.render('ubicaciones', {
      title: 'Ubicaciones',
      videoJuegos: null
    });
});

router.get('/list', function(req, res, next) {
  controller.listUbicaciones(({
    data
  }) => {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(data));
  })
});

router.post('/create', function(req, res, next) {
  console.log(req.body);
  controller.addUbicacion(req.body, ({status, message}) => {
    console.log(status, message);
    res.redirect('/');
  });
});

router.post('/update', function(req, res, next) {
  console.log(req.body);
  controller.updateUbicacion(req.body, ({status, message}) => {
    console.log(status, message)
    res.redirect('/');
  });
});

router.get('/delete/:id', function(req, res, next) {
  const id = req.params.id;
  console.log('delete: ', id)
  controller.deleteUbicacion(id, ({status, message}) => {
    console.log(status, message)
    res.redirect('/');
  });
});

module.exports = router;
