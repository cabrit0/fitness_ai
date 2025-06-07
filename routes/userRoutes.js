const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersControllers");
const workoutsExercisesController = require("../controllers/workoutsExercisesController");
const verifyJWT = require("../middleware/verifyJWT");

// Rota pública para criação de contas
router.post("/", usersController.createNewUser);

// Rotas protegidas
router.use(verifyJWT);
router
  .route("/")
  .get(usersController.getAllUsers)
  .patch(usersController.updateUser)
  .delete(usersController.deleteUser);

router.get("/name", usersController.getUserByName);
router.get("/id", usersController.getUserById);
module.exports = router;
