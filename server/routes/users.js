const express = require("express");
const router = express.Router();
const {
  signUp,
  logIn,
  getDrivers,
  deleteDriver,
} = require("../controllers/UserController");
const validateUserInput = require("../middlewares/validateUserInput");
const corsHeaders = require("../middlewares/headers");

router.post("/signup", corsHeaders, validateUserInput, signUp);
router.post("/login", corsHeaders, logIn);
router.get("/users/drivers", corsHeaders, getDrivers);
router.delete("/users/drivers/:id", corsHeaders, deleteDriver);

module.exports = router;
