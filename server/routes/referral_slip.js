const express = require("express");
const router = express.Router();
const corsHeaders = require("../middlewares/headers");
const requireAuth = require("../middlewares/requireAuth");
const path = require("path");
const fs = require("fs");

router.use(requireAuth);

router.get("/:id", corsHeaders, (req, res) => {
  const { id } = req.params;
  const imagePath = path.join(__dirname, "../public/uploads", id);

  if (fs.existsSync(imagePath)) {
    res.sendFile(imagePath);
  } else {
    res.status(404).send("Image not found");
  }
});

module.exports = router;
