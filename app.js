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
  Videogame.find().then(function (videogame) {
    res.render('index', {videogame: videogame});
  })
})
app.get('/new', function(req, res){
  res.render('new');
})
app.post('/new', function(req, res){
  // error handeling
 Videogame.create(req.body).then(function(){
   res.redirect('/');
 })
})


app.get('/:id/', function(req, res){
   Videogame.findOne({_id: req.params.id}).then(function(videogame){
     res.render('videogame', {videogame: videogame})
   })
})


app.get('/:id/addCharacters/', function(req, res){
  Videogame.findOne({_id: req.params.id}).then(function(videogame){
    res.render('addCharacters', {videogame: videogame})
  })
})
app.post('/:id/updateCharacters/', function(req, res){
  Videogame.findOne({_id: req.params.id}).then(function(videogame){
    videogame.characters.push(req.body);
    videogame.save().then(function(){
      res.render('addCharacters', {videogame: videogame})
    })
  })
})


app.get('/:id/modify/', function(req, res){
  Videogame.findOne({_id: req.params.id}).then(function(videogame){
    res.render('modify', {videogame: videogame})
  })
})
app.post('/:id/update/', function(req, res){
  // need update method
  Videogame.findOneAndUpdate({_id: req.params.id}, req.body).then(function(videogame){
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
     videogame.remove().then(function(){

       res.redirect('/')
     })
   })
 })

app.listen(port, function() {
 console.log('Example listening on port 3000')
})

module.exports = app;
