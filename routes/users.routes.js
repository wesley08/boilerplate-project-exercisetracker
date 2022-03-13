const express = require("express");
const { User } = require("../model/user.model");
const router = express.Router();

router.get("/", async (req, res) => {
  const getAllUser = await User.find();
  res.json(getAllUser);
});

router.post("/", async (req, res) => {
  const { username, _id } = await new User({
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

  await User.findByIdAndUpdate(
    req.params.id,
    { $push: { exercise } },
    function (err, updatedUser) {
      if (err) {
        return console.log("update error:", err);
      }
      res.json({
        _id: updatedUser._id,
        username: updatedUser.username,
        description,
        duration,
        date,
      });
    }
  );
});

router.get("/:id/logs", async (req, res) => {
  let { limit, from, to } = req.query;
  from = new Date(from).toDateString();
  to = new Date(to).toDateString();

  const conditions = {
    _id: req.params.id,
    ...(from === true &&
      to === true && {
        "exercise.date": {
          $gt: from,
          $lt: to,
        },
      }),
  };

  const { _id, exercise, username } = await User.findOne(conditions).exec();

  res.json({
    _id,
    exercise,
    username,
    count: exercise.length,
  });
});

module.exports = router;
