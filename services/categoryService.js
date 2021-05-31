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
	async updateCategory(categoryId, newData) {
		try {
			const updatedCategory = await Category.findByIdAndUpdate(
				categoryId,
				newData
			);
			updatedCategory.save();
			return updatedCategory;
		} catch (error) {
			console.log({ error });
			return {};
		}
	},
	async deleteCategory(categoryId) {
		console.log(categoryId);
		try {
			const deletedCategory = await Category.findByIdAndDelete(categoryId);
			return deletedCategory;
		} catch (error) {
			console.log({ error });
			return {};
		}
	},
};
