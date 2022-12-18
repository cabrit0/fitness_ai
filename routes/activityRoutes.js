const express = require("express");
const router = express.Router();
const activitiesController = require("../controllers/activitiesController");

router
  .route("/")
  .get(activitiesController.getAllUserActivities)
  .patch(activitiesController.updateUserActivities);

module.exports = router;
