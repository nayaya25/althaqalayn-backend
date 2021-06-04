const express = require("express");
const router = express.Router();

const {
	getAllLectures,
	createLecture,
	updateLecture,
	deleteLecture,
	getALecture,
} = require("../controllers/lectureController");
const { verifyToken, isAdmin } = require("../middlewares");

router.get("/", getAllLectures);
router.get("/:id", getALecture);
router.post("/:categoryId", verifyToken, isAdmin, createLecture);
router.put("/:id", verifyToken, isAdmin, updateLecture);
router.delete("/:id/:categoryId", verifyToken, isAdmin, deleteLecture);

module.exports = router;
