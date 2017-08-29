const mongoose = require('mongoose');

const collectionSchema = new mongoose.Schema({
  name: {type: String, required: true, unique: true},
  release_date: Number,
  genre: String,
  IGNrating: Number,
  ESRBrating: String,
  publisher: String,
  platforms: [String],
  price: Number,
  players: {
    min: {type: Number, default: 1},
    max: Number,
    multiPlayer: Boolean
  },
  characters: [{name: String, npc: Boolean, enemy: Boolean}],
})

const Videogame = mongoose.model('Videogame', collectionSchema);

module.exports = Videogame;
