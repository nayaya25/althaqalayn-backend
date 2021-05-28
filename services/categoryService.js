const { Category } = require("../models");

module.exports = {
	async getAllCategories() {
		try {
			const categories = await Category.find();
			return categories;
		} catch (error) {
			console.log({ error });
			return [];
		}
	},
	async createCategory(category) {
		try {
			const newCategory = Category.create(category);
			return newCategory;
		} catch (error) {
			console.log({ error });
			return {};
		}
	},
};
