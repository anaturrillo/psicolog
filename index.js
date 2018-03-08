const express = require('express');
const app = express();
const settings = require('./settings/settings');
const sqlite = require('sqlite3').verbose();
const db = new sqlite.Database(':memory:');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.static('public'));

app.use('/getPepe', function (req, res) {

  db.serialize(function () {
    db.serialize(function() {
      db.run("CREATE TABLE lorem (info TEXT)");

      var stmt = db.prepare("INSERT INTO lorem VALUES (?)");
      for (var i = 0; i < 10; i++) {
        stmt.run("Ipsum " + i);
      }
      stmt.finalize();

      db.each("SELECT rowid AS id, info FROM lorem", function(err, row) {
        console.log(row.id + ": " + row.info);
      });
    });
    

    db.close();
  });

  res.send('pepe')
});

app.listen(settings.port, function () {
  console.log('app levantada en el puerto ' + settings.port)
});