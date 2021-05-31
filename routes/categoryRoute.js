const express = require("express");
const router = express.Router();

const {
	getAllCategories,
	createCategory,
	updateCategory,
	deleteCategory,
	getACategory,
} = require("../controllers/categoryController");

router.get("/", getAllCategories);
router.get("/:id", getACategory);
router.post("/", createCategory);
router.put("/:id", updateCategory);
router.delete("/:id", deleteCategory);

module.exports = router;
