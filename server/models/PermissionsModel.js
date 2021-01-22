const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let PermissionsSchema = new Schema({
  Id: Schema.Types.ObjectId,
  Permissions: Array,
  ViewSubscriptions: Boolean,
  DeleteSubscriptions: Boolean,
  ViewMovies: Boolean,
  CreateMovies: Boolean,
  DeleteMovies: Boolean,
});

module.exports = mongoose.model("permisions", PermissionsSchema);
