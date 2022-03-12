const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

const bodyParser = require("body-parser");

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
mongoose.connect(process.env["mongo_key"], {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const urlSchema = new Schema({
  original_url: String,
  short_url: Number,
});

let Url = mongoose.model("Url", urlSchema);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());
app.use(express.static("public"));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
