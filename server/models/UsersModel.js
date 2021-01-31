const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let UsersSchema = new Schema({
  UserName: String,
  FirstName: String,
  LastName: String,
  CreatedDate: String,
  SessionTimeOut: Number,
});

module.exports = mongoose.model("users", UsersSchema);
