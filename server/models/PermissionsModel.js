const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let PermissionsSchema = new Schema({
  Id: Schema.Types.ObjectId,
  Permissions: Array,
});

module.exports = mongoose.model("permissions", PermissionsSchema);
