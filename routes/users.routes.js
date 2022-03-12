const express = require("express");
const { Excercises } = require("../model/exercises.model");
const { User } = require("../model/user.model");
const router = express.Router();

router.post("/", async (req, res) => {
  const newUser = await new User({
    username: req.body.username,
  }).save();
  res.send(newUser);
});

router.get("/", async (req, res) => {
  const getAllUser = await User.find();
  res.send(getAllUser);
});

router.post("/:id/exercises", async (req, res) => {
  let { description, duration, date } = req.body;
  const getUserById = await User.findById(req.params.id).exec();

  if (date != null) date = new Date().toString();

  const newExercises = await new Excercises({
    username: getUserById.username,
    description,
    duration,
    date,
  }).save();
  res.send(newExercises);
});

module.exports = router;
