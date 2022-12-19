const express = require("express");
const router = express.Router();
const WorkoutsExercises = require("../controllers/workoutsExercisesController");
const verifyJWT = require("../middleware/verifyJWT");

router.use(verifyJWT);
router
  .route("/")
  .get(WorkoutsExercises.getAllWorkouts)
  .post(WorkoutsExercises.createWorkout)
  .patch(WorkoutsExercises.updateExercise)
  .delete(WorkoutsExercises.deleteExercise);
router.delete("/workouts/:workoutId", WorkoutsExercises.deleteWorkout);

module.exports = router;
