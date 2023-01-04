const asyncHandler = require("express-async-handler");
const User = require("../models/User");

// @desc   Assign workout to a calendar date
// @route  POST /user/calendar/assignWorkout
// @Access Private
const assignWorkoutToCalendar = asyncHandler(async (req, res) => {
  // Find the user by their ID
  const user = await User.findById(req.body.id);
  if (!user) {
    return res.status(404).send({ error: "User not found" });
  }

  // Find the workout by its ID
  const workout = user.workouts.id(req.body.workoutId);
  if (!workout) {
    return res.status(404).send({ error: "Workout not found" });
  }

  // Assign the workout to the calendar date
  workout.calendarDate = req.body.calendarDate;

  // Save the user document
  await user.save();

  // Return the updated workout in the response
  res.json(workout);
});

// @desc   Get all calendar workouts for a user
// @route  GET /user/calendar/workouts
// @Access Private
const getCalendarWorkouts = asyncHandler(async (req, res) => {
  // Find the user by their ID
  const id = req.body.id;
  const user = await User.findById(id);
  console.log(user, req.body);
  if (!user) {
    return res.status(404).send({ error: "User not found" });
  }

  // Get all workouts that have a calendarDate set
  const calendarWorkouts = user.workouts.filter((workout) => {
    return workout.calendarDate;
  });

  // Return the calendar workouts in the response
  res.json(calendarWorkouts);
});

// @desc   Remove workout from calendar
// @route  DELETE /user/calendar/removeWorkout
// @Access Private
const removeWorkoutFromCalendar = asyncHandler(async (req, res) => {
  // Find the user by their ID
  const user = await User.findById(req.body.id);
  if (!user) {
    return res.status(404).send({ error: "User not found" });
  }

  console.log(req.body)

  // Find the workout by its ID
  const workout = user.workouts.id(req.body.workoutId);
  if (!workout) {
    return res.status(404).send({ error: "Workout not found" });
  }

  // Remove the calendarDate from the workout
  workout.calendarDate = undefined;

  // Save the user document
  await user.save();

  // Return the updated workout in the response
  res.json(workout);
});

module.exports = {
  assignWorkoutToCalendar,
  getCalendarWorkouts,
  removeWorkoutFromCalendar,
};
