const { lectureService, categoryService } = require("../services");

const getAllLectures = async (req, res) => {
	try {
		const lectures = await lectureService.getAllLectures();
		res.status(200).json({
			status: "success",
			message: "Lectures Fetch Successful",
			lectures,
		});
	} catch (error) {
		console.log({ error });
		res.status(500).json({ status: "error", message: "Server Error" });
	}
};

const getALecture = async (req, res) => {
	const { id } = req.params;
	try {
		const lecture = await Lecture.findOne({ _id: id }).populate("episodes");
		res.status(200).json({
			status: "success",
			message: "Lecture Fetch Successful",
			lecture,
		});
	} catch (error) {
		console.log({ error });
		res.status(500).json({ status: "error", message: "Server Error" });
	}
};

const createLecture = async (req, res) => {
	const { title, yearly, year, numberOfEpisodes } = req.body;
	const { categoryId } = req.params;
	const lecture = {
		title,
		yearly,
		year,
		numberOfEpisodes,
	};
	try {
		const newLecture = await lectureService.createLecture(lecture);
		await categoryService.findCategoryAndUpdate(categoryId, {
			id: newLecture._id,
		});
		res.status(200).json({
			status: "success",
			message: "Lectures Creation Successful",
			lecture: newLecture,
		});
	} catch (error) {
		console.log({ error });
		res.status(500).json({ status: "error", message: "Server Error" });
	}
};

const updateLecture = async (req, res) => {
	const { title, description } = req.body;
	const { id } = req.params;
	const lecture = { title, description, updatedAt: new Date() };
	try {
		const updatedLecture = await lectureService.updateLecture(id, lecture);
		res.status(200).json({
			status: "success",
			message: "Lecture Update Successful",
			lecture: updatedLecture,
		});
	} catch (error) {
		console.log({ error });
		res.status(500).json({ status: "error", message: "Server Error" });
	}
};

const deleteLecture = async (req, res) => {
	const { id } = req.params;
	try {
		const deletedLecture = await lectureService.deleteLecture(id);
		res.status(200).json({
			status: "success",
			message: "Lecture Deletion Successful",
			lecture: deletedLecture,
		});
	} catch (error) {
		console.log({ error });
		res.status(500).json({ status: "error", message: "Server Error" });
	}
};

module.exports = {
	getAllLectures,
	createLecture,
	updateLecture,
	deleteLecture,
	getALecture,
};
