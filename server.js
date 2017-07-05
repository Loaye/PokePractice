'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser').urlencoded({extended: true});
const PORT = process.env.PORT || 3000;

app.use(express.static('./public/'));

app.get('/', function(req, res){
  res.sendfile('./public/index.html');
});

app.listen(PORT, function() {
  console.log('Listening on Port: ', PORT);
});
