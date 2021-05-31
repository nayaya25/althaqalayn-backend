const path = require("path");
const { v4: uuidv4 } = require("uuid");
const { s3Bucket } = require("../config/envVariables");
const { episodeService, lectureService, awsService } = require("../services");

const getAllEpisodes = async (req, res) => {
	try {
		const episodes = await episodeService.getAllEpisodes();
		res.status(200).json({
			status: "success",
			message: "Episodes Fetch Successful",
			episodes,
		});
	} catch (error) {
		console.log({ error });
		res.status(500).json({ status: "error", message: "Server Error" });
	}
};

const createEpisode = async (req, res) => {
	const { title } = req.body;
	const { lectureId } = req.params;
	const episodeData = {
		title,
	};
	const mimeTypes = ["audio/vnd.wav", "audio/mpeg"];
	try {
		const { episode } = req.files;
		if (!mimeTypes.includes(episode.mimetype))
			return res.status(422).json({
				message: "Only MP3 AND WAV files are allowed",
				mimeGiven: episode.mimetype,
			});
		if (episode.size > 20000000)
			return res.status(422).json({
				message: `Please provide files less than 20MB. ${x
					.split("_")
					.join(" ")} size is greater than 20MB`,
			});

		const extension = path.extname(episode.name);
		const filename = uuidv4() + extension;
		const params = {
			Bucket: s3Bucket,
			Key: filename, // File name you want to save as in S3
			Body: episode.data,
			ContentEncoding: "base64",
			ContentType: episode.mimetype,
			ACL: "public-read",
		};
		const { Location } = await awsService.saveFileInBucket(params);
		if (!Location)
			return res
				.status(500)
				.json({ status: "error", message: "File upload failed" });

		episodeData.filePath = Location;
		const newEpisode = await episodeService.createEpisode(episodeData);
		const lecture = await lectureService.findLectureAndUpdate(lectureId, {
			id: newEpisode._id,
		});
		res.status(200).json({
			status: "success",
			message: "Episode Upload Successful",
			episode: newEpisode,
		});
	} catch (error) {
		console.log({ error });
		res.status(500).json({ status: "error", message: "Server Error" });
	}
};

const updateEpisode = async (req, res) => {
	const { title } = req.body;
	const { id } = req.params;
	const episode = { title, updatedAt: new Date() };
	try {
		const updatedEpisode = await episodeService.updateEpisode(id, episode);
		res.status(200).json({
			status: "success",
			message: "Episode Update Successful",
			lecture: updatedEpisode,
		});
	} catch (error) {
		console.log({ error });
		res.status(500).json({ status: "error", message: "Server Error" });
	}
};

const deleteEpisode = async (req, res) => {
	const { id } = req.params;
	try {
		const deletedEpisode = await episodeService.deleteEpisode(id);
		res.status(200).json({
			status: "success",
			message: "Lecture Deletion Successful",
			episode: deletedEpisode,
		});
	} catch (error) {
		console.log({ error });
		res.status(500).json({ status: "error", message: "Server Error" });
	}
};

const getAnEpisode = async (req, res) => {
	const { id } = req.params;
	try {
		const episode = await Episode.findOne({ _id: id });
		res.status(200).json({
			status: "success",
			message: "Episode Fetch Successful",
			episode,
		});
	} catch (error) {
		console.log({ error });
		res.status(500).json({ status: "error", message: "Server Error" });
	}
};

module.exports = {
	getAllEpisodes,
	getAnEpisode,
	createEpisode,
	updateEpisode,
	deleteEpisode,
};
