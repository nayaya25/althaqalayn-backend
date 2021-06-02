const { Lecture } = require("../models");

module.exports = {
	async getAllLectures() {
		try {
			const lectures = await Lecture.find().populate("episodes");
			return lectures;
		} catch (error) {
			console.log({ error });
			return [];
		}
	},
	async createLecture(lecture) {
		try {
			const newLecture = Lecture.create(lecture);
			return newLecture;
		} catch (error) {
			console.log({ error });
			return {};
		}
	},
	async updateLecture(lectureId, newData) {
		try {
			const updatedLecture = await Lecture.findOneAndUpdate(
				{ _id: lectureId },
				newData
			);
			updatedLecture.save();
			return updatedLecture;
		} catch (error) {
			console.log({ error });
			return {};
		}
	},
	async deleteLecture(lectureId) {
		try {
			const deletedLecture = await Lecture.findOneAndDelete({ _id: lectureId });
			return deletedLecture;
		} catch (error) {
			console.log({ error });
			return {};
		}
	},
	async findLectureAndUpdate(lectureId, data) {
		const { id: episodeId } = data;
		try {
			const updatedLecture = await Lecture.findOneAndUpdate(
				{ _id: lectureId },
				{ $push: { episodes: episodeId } },
				{ new: true }
			);
			return updatedLecture;
		} catch (error) {
			console.log({ error });
			return {};
		}
	},
	async getALecture(lectureId) {
		try {
			const lecture = await Lecture.findOne({ _id: lectureId }).populate(
				"episodes"
			);
			return lecture;
		} catch (error) {
			console.log({ error });
			return {};
		}
	},
};
