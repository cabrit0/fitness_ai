const express = require("express");
const router = express.Router();
const exercisesController = require("../controllers/fetchExercisesFromAPI");

router.route("/allExercises").get(exercisesController.getAllExercises);
router.route("/allBodyParts").get(exercisesController.getAllBodyParts);
router.route("/allTargetMuscles").get(exercisesController.getAllTargetMuscles);
router.route("/allEquipments").get(exercisesController.getAllEquipments);
router
  .route("/allExercisesByBodyPart")
  .get(exercisesController.getAllBodyParts);
router
  .route("/allExercisesByTargetMuscle")
  .get(exercisesController.getExercisesByTargetMuscle);
router
  .route("/allExercisesByEquipment")
  .get(exercisesController.getExercisesByEquipment);

module.exports = router;
