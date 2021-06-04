const { roleService } = require("../services");

const getAllRoles = async (req, res) => {
	try {
		const lectures = await roleService.getAllRoles();
		res.status(200).json({
			status: "success",
			message: "Roles Fetch Successful",
			lectures,
		});
	} catch (error) {
		console.log({ error });
		res.status(500).json({ status: "error", message: "Server Error" });
	}
};

const getARole = async (req, res) => {
	const { roleId } = req.params;
	try {
		const role = await roleService.getARole(roleId);
		res.status(200).json({
			status: "success",
			message: "Role Fetch Successful",
			role,
		});
	} catch (error) {
		console.log({ error });
		res.status(500).json({ status: "error", message: "Server Error" });
	}
};

const createRole = async (req, res) => {
	const { name } = req.body;
	try {
		const newRole = await roleService.createRole(name);
		res.status(200).json({
			status: "success",
			message: "Role Creation Successful",
			role: newRole,
		});
	} catch (error) {
		console.log({ error });
		if (error.code === 11000)
			return res.status(500).json({
				status: "error",
				message: `Role with name '${name}' already created`,
			});
		res.status(500).json({ status: "error", message: "Server Error" });
	}
};

const updateRole = async (req, res) => {
	const { name } = req.body;
	const role = { name, updatedAt: new Date() };
	try {
		const updatedRole = await roleService.updateRole(role);
		res.status(200).json({
			status: "success",
			message: "Role Update Successful",
			role: updatedRole,
		});
	} catch (error) {
		console.log({ error });
		res.status(500).json({ status: "error", message: "Server Error" });
	}
};

const deleteRole = async (req, res) => {
	const { roleId } = req.params;
	try {
		const deletedRole = await roleService.deleteRole(roleId);
		res.status(200).json({
			status: "success",
			message: "Lecture Deletion Successful",
			role: deletedRole,
		});
	} catch (error) {
		console.log({ error });
		res.status(500).json({ status: "error", message: "Server Error" });
	}
};

module.exports = {
	getAllRoles,
	createRole,
	updateRole,
	deleteRole,
	getARole,
};
