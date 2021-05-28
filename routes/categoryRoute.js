const router = require("express").Router();

const { getAll } = require("../controllers/categoryController");

router.get("/", getAll);
