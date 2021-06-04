const express = require("express");
const router = express.Router();

const { roleController } = require("../controllers");
const { verifyToken, isAdmin } = require("../middlewares");
const { getAllRoles, getARole, createRole, updateRole, deleteRole } =
	roleController;

router.get("/", getAllRoles);
router.get("/:roleId", getARole);
router.post("/", verifyToken, isAdmin, createRole);
router.put("/:roleId", verifyToken, isAdmin, updateRole);
router.delete("/:roleId", verifyToken, isAdmin, deleteRole);

module.exports = router;
