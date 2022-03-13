const mongoose = require("mongoose");

exports.User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: String,
    exercise:{
      type: [
        {
          description: String,
          duration: Number,
          date: String,
        }
      ],
       required: false
    }
  })
);
