const express = require("express");
const router = express.Router();
const {
  getAllAmbulance,
  getAmbulance,
  postAmbulance,
  putAmbulance,
  deleteAmbulance,
} = require("../controllers/AmbulanceController");

router.get("/", getAllAmbulance);
router.post("/", postAmbulance);

router.get("/:id", getAmbulance);
router.put("/:id", putAmbulance);
router.delete("/:id", deleteAmbulance);

module.exports = router;
