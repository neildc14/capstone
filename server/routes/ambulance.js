const express = require("express");
const router = express.Router();
const {
  getAllAmbulance,
  getAmbulance,
  getAmbulanceFromTripTicket,
  postAmbulance,
  putAmbulance,
  deleteAmbulance,
} = require("../controllers/AmbulanceController");
const corsHeaders = require("../middlewares/headers");

router.get("/all", corsHeaders, getAllAmbulance);
router.post("/all", corsHeaders, postAmbulance);

router.get("/all/:id", corsHeaders, getAmbulance);
router.put("/all/:id", corsHeaders, putAmbulance);
router.delete("/all/:id", corsHeaders, deleteAmbulance);

router.get("/travelling", corsHeaders, getAmbulanceFromTripTicket);

module.exports = router;
