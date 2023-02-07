const express = require("express");
const router = express.Router();
const {
  getAllRequests,
  getRequest,
  postRequest,
  putRequest,
  deleteRequest,
} = require("../controllers/RequestController");

router.get("/", getAllRequests);
router.post("/", postRequest);

router.get("/:id", getRequest);
router.put("/:id", putRequest);
router.delete("/:id", deleteRequest);

module.exports = router;
