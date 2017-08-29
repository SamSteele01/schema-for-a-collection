const mongoose = require('mongoose');

const collectionSchema = new mongoose.Schema({
  name: {type: String, required: true, unique: true},
  release_date: Number,
  genre: String,
  rating: String,
  publisher: String,
  platform: String,
  rating: Number,
  price: Number,
  players: {
    min: {type: Number, default: 1},
    max: Number,
    multiPlayer: Boolean
  }
  characters: [{name: String, npc: Boolean, enemy: Boolean}],
})

const Videogames = mongoose.model('Videogames', collectionSchema);

module.export = 
