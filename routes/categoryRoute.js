const express = require("express");
const router = express.Router();

const { getAll } = require("../controllers/categoryController");

router.get("/", getAll);

module.exports = router;
