const express = require("express");
const router = express.Router();

const { userController } = require("../controllers");
const { verifyToken, isAdmin } = require("../middlewares");
const {
	getAllUsers,
	getAUser,
	createUser,
	updateUser,
	deleteUser,
	loginUser,
	registerUser,
} = userController;

router.get("/", getAllUsers);
router.post("/login", loginUser);
router.post("/register", registerUser);
router.get("/:id", verifyToken, isAdmin, getAUser);
router.post("/", verifyToken, isAdmin, createUser);
router.put("/:userId", verifyToken, isAdmin, updateUser);
router.delete("/:userId", verifyToken, isAdmin, deleteUser);

module.exports = router;
