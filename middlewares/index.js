const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config/envVariables");
const { User, Role } = require("../models");

const generateAccessToken = (data) => {
	return jwt.sign(data, jwtSecret, { expiresIn: "12h" });
};

const verifyToken = async (req, res, next) => {
	try {
		const token = req.headers["x-access-token"];
		if (token) {
			await jwt.verify(token, jwtSecret, (err, authData) => {
				if (err) {
					return res
						.status(403)
						.json({ status: "error", message: "Unathorized Access" });
				}
				const { _id } = authData;
				req.userId = _id;
				next();
			});
		} else {
			return res
				.status(403)
				.json({ status: "error", message: "Auth Token Unavailable" });
		}
	} catch (err) {
		console.log("Error in Authorization", err);
		return res.status(403).json({ message: "Authorization failed" });
	}
};

const verifyMail = async (req, res, next) => {
	const { email } = req.body;
	try {
		const user = User.findOne({ emailAddress: email });
		if (user)
			return res
				.status(400)
				.json({ status: "error", message: "User Already Email Already Used" });
		next();
	} catch (error) {
		console.log({ error });
		res.status(500).json({ status: "error", message: "Something Went Wrong" });
	}
};

const checkRole = async (req, res, next) => {
	const { role } = req.body;
	try {
		const roles = await Role.find().select("name");
		if (!roles.includes(role))
			return res.status(400).json({
				status: "error",
				message: `User Role ${role} does not exist`,
			});

		next();
	} catch (error) {
		console.log({ error });
		res.status(500).json({ status: "error", message: "Something Went Wrong" });
	}
};

const isAdmin = async (req, res, next) => {
	const { userId } = req.body;
	try {
		const user = await User.findOne({ _id: userId });
		const { role } = user;
		if (!role === "admin")
			return res.status(403).json({
				status: "error",
				message: `You have '${role}' privileges. Only Admin can Access these.`,
			});

		next();
	} catch (error) {
		console.log({ error });
		res.status(500).json({ status: "error", message: "Something Went Wrong" });
	}
};

module.exports = {
	verifyToken,
	generateAccessToken,
	verifyMail,
	isAdmin,
	checkRole,
};
