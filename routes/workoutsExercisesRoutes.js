const express = require("express");
const router = express.Router();
const WorkoutsExercises = require("../controllers/workoutsExercisesController");

router
  .route("/")
  .get(WorkoutsExercises.getAllWorkouts)
  .post(WorkoutsExercises.createWorkout)
  .patch(WorkoutsExercises.updateExercise)
  .delete(WorkoutsExercises.deleteExercise);

module.exports = router;
