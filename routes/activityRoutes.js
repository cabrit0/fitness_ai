const express = require("express");
const router = express.Router();
const activitiesController = require("../controllers/activitiesController");
const verifyJWT = require("../middleware/verifyJWT");

router.use(verifyJWT);
router
  .route("/")
  .get(activitiesController.getAllUserActivities)
  .patch(activitiesController.updateUserActivities);

module.exports = router;
