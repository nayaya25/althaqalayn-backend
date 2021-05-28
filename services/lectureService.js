const { Lecture } = require("../models");

module.exports = {
	async getAllCategories() {
		try {
			const lectures = await Lecture.find();
			return lectures;
		} catch (error) {
			console.log({ error });
			return [];
		}
	},
	async createCategory(category) {
		try {
			const newCategory = Lecture.create(category);
			return newCategory;
		} catch (error) {
			console.log({ error });
			return {};
		}
	},
};
