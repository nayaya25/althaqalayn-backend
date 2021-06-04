const { Category } = require("../models");
const { categoryService } = require("../services");

const getAllCategories = async (req, res) => {
	try {
		const categories = await categoryService.getAllCategories();
		res.status(200).json({
			status: "success",
			message: "Categories Fetch Successful",
			categories,
		});
	} catch (error) {
		console.log({ error });
		res.status(500).json({ status: "error", message: "Server Error" });
	}
};

const createCategory = async (req, res) => {
	const { name, description } = req.body;
	const category = { name, description, createdAt: new Date() };
	try {
		const newCategory = await categoryService.createCategory(category);
		res.status(200).json({
			status: "success",
			message: "Categories Creation Successful",
			category: newCategory,
		});
	} catch (error) {
		console.log({ error });
		if (error.code === 11000)
			return res.status(500).json({
				status: "error",
				message: `Category with name '${name}' already created`,
			});
		res.status(500).json({ status: "error", message: "Server Error" });
	}
};

const updateCategory = async (req, res) => {
	const { name, description } = req.body;
	const { id } = req.params;
	const category = { name, description, updatedAt: new Date() };
	try {
		const updatedCategory = await categoryService.updateCategory(id, category);
		res.status(200).json({
			status: "success",
			message: "Category Update Successful",
			category: updatedCategory,
		});
	} catch (error) {
		console.log({ error });
		res.status(500).json({ status: "error", message: "Server Error" });
	}
};

const deleteCategory = async (req, res) => {
	const { id } = req.params;
	try {
		const deletedCategory = await categoryService.deleteCategory(id);
		res.status(200).json({
			status: "success",
			message: "Category Deletion Successful",
			category: deletedCategory,
		});
	} catch (error) {
		console.log({ error });
		res.status(500).json({ status: "error", message: "Server Error" });
	}
};

const getACategory = async (req, res) => {
	const { id } = req.params;
	try {
		const category = await Category.findOne({ _id: id }).populate("lecture");
		res.status(200).json({
			status: "success",
			message: "Category Fetch Successful",
			category,
		});
	} catch (error) {
		console.log({ error });
		res.status(500).json({ status: "error", message: "Server Error" });
	}
};

module.exports = {
	getAllCategories,
	createCategory,
	updateCategory,
	deleteCategory,
	getACategory,
};
