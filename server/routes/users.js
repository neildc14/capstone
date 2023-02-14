const express = require("express");
const router = express.Router();
const { signUp, logIn } = require("../controllers/UserController");
const validateUserInput = require("../middlewares/validateUserInput");

router.post("/signup", validateUserInput, signUp);
router.post("/login", logIn);

module.exports = router;
