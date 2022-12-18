const User = require("../models/User");
const asyncHandler = require("express-async-handler");

// @desc   Get all activities for a user
// @route  GET /users/activities
// @Access Private
const getAllUserActivities = asyncHandler(async (req, res) => {
  const { id } = req.body;

  const user = await User.findById(id).exec();
  
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json(user.activities);
});

// @desc   Update activities for a user
// @route  PATCH /users/activities
// @Access Private
const updateUserActivities = asyncHandler(async (req, res) => {
  const { id } = req.body;
  const { activities } = req.body;

  if (!Array.isArray(activities)) {
    return res.status(400).json({ message: "Activities must be an array" });
  }

  const user = await User.findById(id).exec();

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  user.activities = activities;
  const updatedUser = await user.save();

  res.json({ message: `Activities for ${updatedUser.username} updated` });
});

module.exports = { getAllUserActivities, updateUserActivities };
