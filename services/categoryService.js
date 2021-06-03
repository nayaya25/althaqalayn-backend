const { Category, Lecture, Episode } = require("../models");

module.exports = {
	async getAllCategories() {
		try {
			const categories = await Category.find().populate("lectures");
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
			const updatedCategory = await Category.findOneAndUpdate(
				{ _id: categoryId },
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
		try {
			const deletedCategory = await Category.findOneAndDelete({
				_id: categoryId,
			});
			const { lectures } = deletedCategory;
			for (const lectureId of lectures) {
				const { episodes } = await Lecture.findOne({ _id: lectureId });
				await Episode.deleteMany({ _id: { $in: episodes } });
			}
			await Lecture.deleteMany({ _id: { $in: lectures } });
			return deletedCategory;
		} catch (error) {
			console.log({ error });
			return {};
		}
	},
	async findCategoryAndUpdate(id, data) {
		const { id: lectureId } = data;
		try {
			const updatedCategory = await Category.findOneAndUpdate(
				{ _id: id },
				{ $push: { lectures: lectureId } },
				{ new: true }
			);
			return updatedCategory;
		} catch (error) {
			console.log({ error });
			return {};
		}
	},
	async getACategory(categoryId) {
		try {
			const category = await Category.findOne({ _id: categoryId }).populate(
				"lectures"
			);
			return category;
		} catch (error) {
			console.log({ error });
			return {};
		}
	},
};
