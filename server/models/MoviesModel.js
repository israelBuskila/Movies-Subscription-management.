const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let MoviesSchema = new Schema({
  name: String,
  genres: Array,
  image: Object,
  premiered: String,
});

module.exports = mongoose.model("movies", MoviesSchema);
