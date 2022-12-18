const asyncHandler = require("express-async-handler");
const User = require("../models/User");

const getAllWorkouts = asyncHandler(async (req, res) => {
  // Find the user by their ID
  const user = await User.findById(req.body.id);
  if (!user) {
    return res.status(404).send({ error: "User not found" });
  }
  res.json(user.workouts);
});

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

const updateExercise = asyncHandler(async (req, res) => {
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

  // Find the exercise by its ID
  const exercise = workout.exercises.id(req.body.exerciseId);
  if (!exercise) {
    return res.status(404).send({ error: "Exercise not found" });
  }

  // Update the exercise with the new data
  exercise.name = req.body.name;
  exercise.bodyPart = req.body.bodyPart;
  exercise.target = req.body.target;
  exercise.equipment = req.body.equipment;
  exercise.animatedGif = req.body.animatedGif;
  await user.save();
  res.json(exercise);
});

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

module.exports = {
  getAllWorkouts,
  createWorkout,
  updateExercise,
  deleteExercise,
};
