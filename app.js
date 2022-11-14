const express = require('express')
const hbs = require('hbs')
const path = require('path')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')

const app = express()

// view engine setup
hbs.registerPartials(__dirname + '/views/partials', function(err) {});
app.set('view engine', 'hbs');
app.set("views", __dirname + "/views");

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

// definicion de rutas
app.use('/', require('./routes/index'));
app.use('/videoJuegos', require('./routes/videoJuegos'));

// catch 404 and forward to error handler
app.use(function(req, res, next) { 
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app