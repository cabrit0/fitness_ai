const express = require("express");
const router = express.Router();
const exercisesController = require("../controllers/fetchExercisesFromAPI");
const verifyJWT = require("../middleware/verifyJWT");

// Aplicar autenticação a todas as rotas de exercícios
router.use(verifyJWT);

router.route("/allExercises").get(exercisesController.getAllExercises);
router.route("/allBodyParts").get(exercisesController.getAllBodyParts);
router.route("/allTargetMuscles").get(exercisesController.getAllTargetMuscles);
router.route("/allEquipments").get(exercisesController.getAllEquipments);
router
  .route("/bodyPart/:bodyPart")
  .get(exercisesController.getExercisesByBodyPart);
router
  .route("/target/:targetMuscle")
  .get(exercisesController.getExercisesByTargetMuscle);
router
  .route("/equipment/:equipment")
  .get(exercisesController.getExercisesByEquipment);
// Esta rota deve vir por último para evitar conflitos com outras rotas
router.route("/:id").get(exercisesController.getExerciseById);

module.exports = router;
