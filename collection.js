const mongoose = require('mongoose');

const collectionSchema = new mongoose.Schema({
  image: {type: String, unique: false},
  gameName: {type: String, required: true, unique: true},
  release_date: Number,
  genre: String,
  publisher: String,
  IGNrating: Number,
  ESRBrating: String,
  platforms: [String],
  price: Number,
  players: {
    min: {type: Number, default: 1},
    max: Number,
    multiPlayer: Boolean
  },
  characters: [{chName: String, npc: Boolean, enemy: Boolean}],
})

const Videogame = mongoose.model('Videogame', collectionSchema);

module.exports = Videogame;
