const mongoose = require("mongoose");

exports.Excercises = mongoose.model(
  "Exercise",
  new mongoose.Schema({
    username: String,
    description: String,
    duration: Number,
    date: String,
  })
);
