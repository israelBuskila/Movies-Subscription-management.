const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let MoviesSchema = new Schema({
  Name: String,
  Genres: Array,
  Image: String,
  SessionTimeOut: Number,
  Premired: Date,
});

module.exports = mongoose.model("movies", MoviesSchema);
