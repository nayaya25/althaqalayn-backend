const { Role } = require("../models");

module.exports = {
	async getAllRoles() {
		try {
			const roles = await Role.find();
			return roles;
		} catch (error) {
			console.log({ error });
			return [];
		}
	},
	async createRole(role) {
		try {
			const newRole = Role.create(role);
			return newRole;
		} catch (error) {
			console.log({ error });
			return {};
		}
	},
	async updateRole(roleId, newData) {
		try {
			const updatedRole = await Role.findOneAndUpdate({ _id: roleId }, newData);
			updatedRole.save();
			return updatedRole;
		} catch (error) {
			console.log({ error });
			return {};
		}
	},
	async deleteRole(roleId) {
		try {
			const deletedRole = await Role.findOneAndDelete({ _id: roleId });
			return deletedRole;
		} catch (error) {
			console.log({ error });
			return {};
		}
	},
	async getARole(roleId) {
		try {
			const role = await Role.findOne({ _id: roleId });
			return role;
		} catch (error) {
			console.log({ error });
			return {};
		}
	},
	async getRoleByName(roleName) {
		try {
			const role = await Role.findOne({ name: roleName });
			return role;
		} catch (error) {
			console.log({ error });
			return {};
		}
	},
};
