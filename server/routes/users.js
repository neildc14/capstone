const express = require("express");
const router = express.Router();
const {
  signUp,
  logIn,
  getDrivers,
  deleteDriver,
} = require("../controllers/UserController");
const validateUserInput = require("../middlewares/validateUserInput");

router.post("/signup", validateUserInput, signUp);
router.post("/login", logIn);
router.get("/users/drivers", getDrivers);
router.delete("/users/drivers", deleteDriver);

module.exports = router;
