const express = require("express");
const router = express.Router();

const {
	getAllLectures,
	createLecture,
	updateLecture,
	deleteLecture,
	getALecture,
} = require("../controllers/lectureController");

router.get("/", getAllLectures);
router.get("/:id", getALecture);
router.post("/:categoryId", createLecture);
router.put("/:id", updateLecture);
router.delete("/:id/:categoryId", deleteLecture);

module.exports = router;
