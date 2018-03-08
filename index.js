const express = require('express');
const app = express();
const settings = require('./settings/settings');

app.use('/', function (req, res) {
  res.send('pepe')
});

app.listen(settings.port, function () {
  console.log('app levantada en el puerto ' + settings.port)
});