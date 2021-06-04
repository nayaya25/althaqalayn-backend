const { User, Role } = require("../models");

module.exports = {
	async getAllUsers() {
		try {
			const users = await User.find().populate("role", "_id");
			return users;
		} catch (error) {
			console.log({ error });
			return [];
		}
	},
	async createUser(userData) {
		try {
			const newUser = User.create(userData);
			return newUser;
		} catch (error) {
			console.log({ error });
			return {};
		}
	},
	async updateUser(userId, newData) {
		try {
			const updatedUser = await User.findOneAndUpdate({ _id: userId }, newData);
			updatedUser.save();
			return updatedUser;
		} catch (error) {
			console.log({ error });
			return {};
		}
	},
	async deleteUser(userId) {
		try {
			const deletedUser = await User.findOneAndDelete({ _id: userId });
			return deletedUser;
		} catch (error) {
			console.log({ error });
			return {};
		}
	},
	async getAUser(userId) {
		try {
			const user = await User.findOne({ _id: userId });
			return user;
		} catch (error) {
			console.log({ error });
			return {};
		}
	},
	async getAUserByMail(emailAddress) {
		try {
			const user = await User.findOne({ emailAddress });
			return user;
		} catch (error) {
			console.log({ error });
			return {};
		}
	},
};
