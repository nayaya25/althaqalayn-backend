const express = require("express");
const router = express.Router();

const {
	getAllCategories,
	createCategory,
	updateCategory,
	deleteCategory,
	getACategory,
} = require("../controllers/categoryController");
const { verifyToken, isAdmin } = require("../middlewares");

router.get("/", getAllCategories);
router.get("/:id", getACategory);
router.post("/", verifyToken, isAdmin, createCategory);
router.put("/:id", verifyToken, isAdmin, updateCategory);
router.delete("/:id", verifyToken, isAdmin, deleteCategory);

module.exports = router;
