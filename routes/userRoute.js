const express = require("express");
const router = express.Router();

const { userController, roleController } = require("../controllers");
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
router.get("/:id", getAUser);
router.post("/", createUser);
router.put("/:userId", updateUser);
router.delete("/:userId", deleteUser);

module.exports = router;
