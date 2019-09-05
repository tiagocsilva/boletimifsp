const express = require('express');
const app = express();

app.get('/', function (req, res) {
  res.send('Boletim IFSP!');
});

module.exports = app;