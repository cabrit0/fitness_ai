const asyncHandler = require("express-async-handler");
const User = require("../models/User");

// @desc   Get all workouts
// @route  GET /user/workouts&exercises
// @Access Private
const getAllWorkouts = asyncHandler(async (req, res) => {
  console.log(req.query.id)
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

// @desc   Update exercise
// @route  PATCH /user/workouts&exercises
// @Access Private
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
  req.body.exercises.map((exerciseData) => {
    // Find the exercise by its ID
    const exercise = workout.exercises.find(
      (exercise) => exercise.id === exerciseData.exerciseId
    );
    //console.log(req.body.exercises);
    //console.log(exerciseData.exerciseId, workout.exercises.id, exercise);

    // Update the exercise with the new data
    exercise.name = exerciseData.name;
    exercise.bodyPart = exerciseData.bodyPart;
    exercise.target = exerciseData.target;
    exercise.equipment = exerciseData.equipment;
    exercise.animatedGif = exerciseData.animatedGif;
  });

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
  updateExercise,
  deleteExercise,
  deleteWorkout,
};
