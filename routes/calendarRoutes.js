const express = require("express");
const router = express.Router();
const workoutCalendarHandler = require("../controllers/calendarController");
const calendarHandler = require("../controllers/calendarController");
const verifyJWT = require("../middleware/verifyJWT");

router.use(verifyJWT);

router.route("/workouts").post(calendarHandler.getCalendarWorkouts);
router.route("/assignWorkout").post(calendarHandler.assignWorkoutToCalendar);
router.route("/removeWorkout").delete(calendarHandler.removeWorkoutFromCalendar);

module.exports = router;
