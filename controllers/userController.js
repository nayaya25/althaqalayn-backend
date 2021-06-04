const { User, Role } = require("../models");
const { userService, roleService } = require("../services");
const bcrypt = require("bcrypt");
const { generateAccessToken } = require("../middlewares");

const getAllUsers = async (req, res) => {
	try {
		const users = await userService.getAllUsers();
		res.status(200).json({
			status: "success",
			message: "Users Fetch Successful",
			users,
		});
	} catch (error) {
		console.log({ error });
		res.status(500).json({ status: "error", message: "Server Error" });
	}
};

const createUser = async (req, res) => {
	const { firstName, lastName, emailAddress, phoneNumber, password, roleId } =
		req.body;
	try {
		const role = await roleService.getARole(roleId);
		if (!role)
			return res
				.status(400)
				.json({ status: "error", message: "Role Specified Do not exist" });

		const encPass = await bcrypt.hash(password, 10);
		const { _id } = role;
		const newUser = await userService.createUser({
			firstName,
			lastName,
			emailAddress,
			phoneNumber,
			password: encPass,
		});

		newUser.role = _id;
		newUser.save();

		res.status(200).json({
			status: "success",
			message: "User Created Successfully Successful",
			user: newUser,
		});
	} catch (error) {
		console.log({ error });
		if (error.code === 11000)
			return res.status(500).json({
				status: "error",
				message: `User with Email/Phone '${emailAddress}/${phoneNumber}' already created`,
			});
		res.status(500).json({ status: "error", message: "Server Error" });
	}
};

const registerUser = async (req, res) => {
	const { firstName, lastName, emailAddress, phoneNumber, password } = req.body;
	let role;
	try {
		role = await roleService.getRoleByName("regular");
		if (!role) role = await Role.create({ name: "regular" });

		const encPass = await bcrypt.hash(password, 10);
		const { _id } = role;
		const newUser = await userService.createUser({
			firstName,
			lastName,
			emailAddress,
			phoneNumber,
			password: encPass,
			role: _id,
		});

		res.status(200).json({
			status: "success",
			message: "User Registered Successfully",
			user: newUser,
		});
	} catch (error) {
		console.log({ error });
		res.status(500).json({ status: "error", message: "Server Error" });
	}
};

const updateUser = async (req, res) => {
	const data = req.body;
	try {
		const updatedUser = await userService.updateUser(id, {
			...data,
			updatedAt: new Date(),
		});

		res.status(200).json({
			status: "success",
			message: "User Update Successful",
			user: updatedUser,
		});
	} catch (error) {
		console.log({ error });
		res.status(500).json({ status: "error", message: "Server Error" });
	}
};

const deleteUser = async (req, res) => {
	const { userId } = req.params;
	try {
		const deletedUser = await userService.deleteUser(userId);
		res.status(200).json({
			status: "success",
			message: "User Deletion Successful",
			user: deletedUser,
		});
	} catch (error) {
		console.log({ error });
		res.status(500).json({ status: "error", message: "Server Error" });
	}
};

const getAUser = async (req, res) => {
	const { userId } = req.params;
	try {
		const user = await userService.getAUser(userId);
		res.status(200).json({
			status: "success",
			message: "User Fetch Successful",
			user,
		});
	} catch (error) {
		console.log({ error });
		res.status(500).json({ status: "error", message: "Server Error" });
	}
};

const loginUser = async (req, res) => {
	const { emailAddress, password: pass } = req.body;
	try {
		const user = await userService.getAUserByMail(emailAddress);
		if (!user)
			return res.status(404).json({
				status: "error",
				message: `User with Email ${emailAddress} Not Found`,
			});
		const { password, _id, firstName, lastName, emailAddress: email } = user;
		const match = await bcrypt.compare(pass, password);
		if (!match)
			return res.status(422).json({ message: "Incorrect password provided" });

		const token = generateAccessToken({
			_id,
			firstName,
			lastName,
			email,
		});

		if (!token)
			return res
				.status(400)
				.json({ status: "error", message: "Token Generation Error" });

		res.status(200).json({
			status: "success",
			message: "User Login Successful",
			token,
		});
	} catch (error) {
		console.log({ error });
		res.status(500).json({ status: "error", message: "Server Error" });
	}
};

module.exports = {
	getAllUsers,
	getAUser,
	createUser,
	updateUser,
	deleteUser,
	registerUser,
	loginUser,
};
