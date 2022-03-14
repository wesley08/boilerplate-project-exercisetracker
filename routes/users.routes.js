const express = require("express");
const { Exercise } = require("../model/exercises.model");
const { User } = require("../model/user.model");
const router = express.Router();

router.get("/", async (req, res) => {
  const getAllUser = await User.find();
  res.send(getAllUser);
});

router.post("/", async (req, res) => {
  const  { username, _id } = await new User({
    username: req.body.username,
  }).save();

  res.json({ username, _id });
});

router.post("/:id/exercises", async (req, res) => {
  let { description, duration, date } = req.body;

  date = date ? new Date(date).toDateString() : new Date().toDateString();

  const exercise = {
    description,
    duration,
    date,
  };

  const user = await User.findById(req.params.id);
  user.exercise.push(exercise);
  user.save();
  
  res.json({
        username: user.username,
        description,
        duration: parseInt(duration),
        _id: user._id,
        date,
      });
});

router.get("/:id/logs", async (req, res) => {
  let { limit, from, to } = req.query;

  const user = await User.findById(req.params.id).select("-exercise._id").exec();
  
  if(from && to){
    user.exercise = user.exercise.filter(e => (Date.parse(e.date) >= Date.parse(from)) && (Date.parse(e.date) <= Date.parse(to)));
  }

  if(limit){
    limit = parseInt(limit);
    user.exercise = user.exercise.slice(0,limit );
  }

  console.log(user);

  res.json({
    _id: user._id,
    username: user.username,
    count: user.exercise.length,
    log: user.exercise,
  });
});

module.exports = router;
