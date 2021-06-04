const express = require("express");
const router = express.Router();

const {
	getAllEpisodes,
	createEpisode,
	updateEpisode,
	deleteEpisode,
	getAnEpisode,
} = require("../controllers/episodeController");
const { verifyToken, isAdmin } = require("../middlewares");

router.get("/", getAllEpisodes);
router.get("/:id", getAnEpisode);
router.post("/:lectureId", verifyToken, isAdmin, createEpisode);
router.put("/:id", verifyToken, isAdmin, updateEpisode);
router.delete("/:id:/lectureId", verifyToken, isAdmin, deleteEpisode);

module.exports = router;
