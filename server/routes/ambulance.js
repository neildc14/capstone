const express = require("express");
const router = express.Router();
const {
  getAllAmbulance,
  getAmbulance,
  postAmbulance,
  putAmbulance,
  deleteAmbulance,
} = require("../controllers/AmbulanceController");
const corsHeaders = require("../middlewares/headers");

router.get("/", corsHeaders, getAllAmbulance);
router.post("/", corsHeaders, postAmbulance);

router.get("/:id", corsHeaders, getAmbulance);
router.put("/:id", corsHeaders, putAmbulance);
router.delete("/:id", corsHeaders, deleteAmbulance);

module.exports = router;
