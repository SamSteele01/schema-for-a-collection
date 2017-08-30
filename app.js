const fs = require('fs');
const port = 3000;
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const mustacheExpress = require('mustache-express');

const Videogame = require('./collection')

const mongoURL = 'mongodb://localhost:27017/videogames';
mongoose.connect(mongoURL, {useMongoClient: true});
mongoose.Promise = require('bluebird');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.engine('mustache', mustacheExpress());
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'mustache')
app.set('layout', 'layout')

app.use('/static', express.static('static'));

//routing begin!

app.get('/', function (req, res) {
  Videogame.find().then(function (Videogame) {
    res.render('index', {Videogame: Videogame});
  })
})

app.get('/new', function(req, res){
  res.render('new');
 })

 app.post('/new', function(req, res){
   Videogame.create(req.body).then(function(){
     res.redirect('/');
   })
})

app.get('/:id/', function(req, res){
   Videogame.findOne({_id: req.params.id}).then(function(videogame){
     res.render('videogame', {videogame: videogame})
   })
 })

 app.get('/:id/modify/', function(req, res){
    Videogame.findOne({_id: req.params.id}).then(function(videogame){
      res.render('modify', {videogame: videogame})
    })
  })

  app.post('/:id/update/', function(req, res){
    // need update method
    Videogame.findOne({_id: req.params.id}).then(function(videogame){
      res.render('videogame', {videogame: videogame})
    })
 })

 app.post('/:id/image/', function(req, res){
   // need update method
  //  need image handler, file or mongo?
   Videogame.findOne({_id: req.params.id}).then(function(videogame){
     res.render('videogame', {videogame: videogame})
   })
})

  app.post('/:id/delete', function(req, res){
     Videogame.findOne({_id: req.params.id}).then(function(videogame){
       res.render('', {videogame: videogame})
     })
   })

 app.listen(port, function() {
   console.log('Example listening on port 3000')
 })

module.exports = app;
