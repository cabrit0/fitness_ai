const asyncHandler = require("express-async-handler");
const User = require("../models/User");

// @desc   Get all workouts
// @route  GET /user/workouts&exercises
// @Access Private
const getAllWorkouts = asyncHandler(async (req, res) => {
  console.log(req.query.id);
  // Find the user by their ID
  const user = await User.findById(req.query.id);
  if (!user) {
    return res.status(404).send({ error: "User not found" });
  }
  res.json(user.workouts);
});

// @desc   Create workout
// @route  POST /user/workouts&exercises
// @Access Private
const createWorkout = asyncHandler(async (req, res) => {
  // Find the user by their ID
  const user = await User.findById(req.body.id);
  if (!user) {
    return res.status(404).send({ error: "User not found" });
  }

  // Add the new workout to the user's workouts array
  user.workouts.push(req.body);
  await user.save();
  res.json(user.workouts);
});

// @desc   Update workout
// @route  PATCH /user/workouts&exercises
// @Access Private
const updateWorkout = asyncHandler(async (req, res) => {
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

  // Update the workout with the new data
  workout.name = req.body.name;
  workout.description = req.body.description;
  workout.day = req.body.day;
  workout.exercises = req.body.exercises;

  // Save the user document
  await user.save();

  // Return the updated workout in the response
  res.json(workout);
});

// @desc   Delete exercise
// @route  Delete /user/workouts&exercises
// @Access Private
const deleteExercise = asyncHandler(async (req, res) => {
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

  // Find the exercise by its ID and remove it from the workout
  const exercise = workout.exercises.id(req.body.exerciseId);
  if (!exercise) {
    return res.status(404).send({ error: "Exercise not found" });
  }
  exercise.remove();
  await user.save();
  res.json(exercise);
});

// @desc   Delete workout
// @route  Delete /user/workouts&exercises/workouts/:workoutId
// @Access Private
const deleteWorkout = asyncHandler(async (req, res) => {
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

  // Remove the workout from the user's workouts array
  workout.remove();

  // Save the user document
  await user.save();

  // Return the removed workout in the response
  res.json(workout);
});

module.exports = {
  getAllWorkouts,
  createWorkout,
  updateWorkout,
  deleteExercise,
  deleteWorkout,
};
