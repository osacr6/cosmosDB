var express = require('express');
var router = express.Router();

const Ventas = require('../controllers/ventas.controller');
const controller = new Ventas();

/* GET Ventas page. */
router.get('/', function(req, res, next) {
    res.render('ventas', {
      title: 'Ventas',
      videoJuegos: null
    });
});

router.get('/list', function(req, res, next) {
  controller.listVentas(({
    data
  }) => {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(data));
  })
});

router.post('/create', function(req, res, next) {
  console.log(req.body);
  controller.addVenta(req.body, ({status, message}) => {
    console.log(status, message);
    res.redirect('/');
  });
});

router.post('/update', function(req, res, next) {
  console.log(req.body);
  controller.updateVenta(req.body, ({status, message}) => {
    console.log(status, message)
    res.redirect('/');
  });
});

router.get('/delete/:id', function(req, res, next) {
  const id = req.params.id;
  console.log('delete: ', id)
  controller.deleteVenta(id, ({status, message}) => {
    console.log(status, message)
    res.redirect('/');
  });
});

module.exports = router;
