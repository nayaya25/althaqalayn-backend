const express = require("express");
const router = express.Router();

const { roleController } = require("../controllers");
const { getAllRoles, getARole, createRole, updateRole, deleteRole } =
	roleController;

router.get("/", getAllRoles);
router.get("/:roleId", getARole);
router.post("/", createRole);
router.put("/:roleId", updateRole);
router.delete("/:roleId", deleteRole);

module.exports = router;
