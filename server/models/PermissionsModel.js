const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let PermissionsSchema = new Schema({
  UserName: String,
  Permissions: Array,
});

module.exports = mongoose.model("permissions", PermissionsSchema);
