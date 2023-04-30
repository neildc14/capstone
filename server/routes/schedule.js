const express = require("express");
const router = express.Router();
const {
  getAllSchedule,
  getSchedule,
  getSchedulePerDriver,
  postSchedule,
  putSchedule,
  deleteSchedule,
  deleteAll,
} = require("../controllers/ScheduleController");
const corsHeaders = require("../middlewares/headers");
const requireAuth = require("../middlewares/requireAuth");



router.get("/all_schedule/", corsHeaders, getAllSchedule);
router.post("/all_schedule/", requireAuth,corsHeaders, postSchedule);


router.get("/all_schedule/:id", corsHeaders, getSchedule);
router.put("/all_schedule/:id", requireAuth, corsHeaders, putSchedule);
router.delete("/all_schedule/:id", corsHeaders, deleteSchedule);
router.delete("/all_schedule/", corsHeaders, deleteAll);

router.get("/personnel/:id", corsHeaders, getSchedulePerDriver);

module.exports = router;
