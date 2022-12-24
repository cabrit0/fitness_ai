const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersControllers");
const workoutsExercisesController = require("../controllers/workoutsExercisesController");
const verifyJWT = require("../middleware/verifyJWT");

//router.use(verifyJWT);
router
  .route("/")
  .get(usersController.getAllUsers)
  .post(usersController.createNewUser)
  .patch(usersController.updateUser)
  .delete(usersController.deleteUser);

module.exports = router;
