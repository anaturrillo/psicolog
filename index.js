const express = require('express');
const app = express();
const settings = require('./settings/settings');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(express.static('public'));

app.use('/getPepe', function (req, res) {
  res.send('pepe')
});

app.listen(settings.port, function () {
  console.log('app levantada en el puerto ' + settings.port)
});