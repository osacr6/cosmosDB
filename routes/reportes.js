var express = require('express');
var router = express.Router();

const Ventas = require('../controllers/ventas.controller');
const VideoJuegos = require('../controllers/videoJuegos.controller');
const Ubicaciones = require('../controllers/ubicaciones.controller');

const ubicacionesController = new Ubicaciones();
const videoJuegoscontroller = new VideoJuegos();
const ventascontroller = new Ventas();

const ventasTotales = (juegoId, ubicaciones, ventas) => {
  const ventasPorUbicacion = ubicaciones.map(ubicacion => {
    const ventasUbicacion = ventas.filter(venta =>
      venta.videoJuegoId == juegoId &&
      venta.ubicacionId == ubicacion.id
    )
    const sumaventas = {
      [ubicacion.Nombre]: ventasUbicacion.reduce( (suma, venta) => suma + Number(venta.cantidad), 0) || 0
    };
    return sumaventas;
  }).reduce( (a, e) =>  Object.assign(a, e), {});

  const ventasGlobal = Object.keys(ventasPorUbicacion).reduce( (suma, venta) => 
    suma + Number(ventasPorUbicacion[venta]), 0
  ) || 0;
  const ReporteVentasGlobal = {
    ...ventasPorUbicacion,
    global: ventasGlobal
  };
  //console.log(ReporteVentasGlobal);
  return ReporteVentasGlobal;
}

const reporteDeVentasVideoJuego =(data,res) => {
    ubicacionesController.listUbicaciones((ubicaciones) => {
    videoJuegoscontroller.listVideoJuegos((videoJuegos) => {
      ventascontroller.listVentas((ventas) => {
        reporte = videoJuegos.data.map(juego => {
          const ventasJuego = ventasTotales(juego.id, ubicaciones.data, ventas.data);
          const ventasTotalVideoJuego = {
            Id: juego.id,
            Nombre: juego.Nombre,
            Plataforma: juego.Plataforma,
            Editorial: juego.Editorial,
            Genero: juego.Genero,
            ...ventasJuego,
          }
          console.log(ventasTotalVideoJuego);
          return ventasTotalVideoJuego;
        });
        res(reporte);
      })
    });
  })
};

router.get('/', function(req, res, next) {
  res.render('reportes', {
    title: 'reportes sobre vntas de Video Juegos',
    videoJuegos: null
  });
});

router.get('/ventas', function(req, res, next) {
  reporteDeVentasVideoJuego(null,(reporte) => {
    res.render('reportes', {
      title: 'reportes sobre ventas Video Juegos',
      videoJuegos: reporte
    });
  });
});

router.get('/ventas/json', function(req, res, next) {
  reporteDeVentasVideoJuego(null,(reporte) => {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(reporte));
  });
});

module.exports = router;