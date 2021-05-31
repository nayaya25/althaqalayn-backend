const express = require("express");
const router = express.Router();

const {
	getAllEpisodes,
	createEpisode,
	updateEpisode,
	deleteEpisode,
	getAnEpisode,
} = require("../controllers/episodeController");

router.get("/", getAllEpisodes);
router.get("/:id", getAnEpisode);
router.post("/:lectureId", createEpisode);
router.put("/:id", updateEpisode);
router.delete("/:id", deleteEpisode);

module.exports = router;
