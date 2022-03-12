const mongoose = require("mongoose");

exports.User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: String,
  })
);
