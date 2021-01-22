const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let SubscriptionsSchema = new Schema({
  Name: String,
  Email: String,
  City: String,
});

module.exports = mongoose.model("subscriptions", SubscriptionsSchema);
