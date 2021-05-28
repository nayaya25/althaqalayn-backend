const express = require("express");
const router = express.Router();

const { getAll } = require("../controllers/lectureController");

router.get("/", getAll);

module.exports = router;
