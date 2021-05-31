const jwt = require("jsonwebtoken");

const generateAccessToken = async () => {
	return await jwt.sign(
		{ data: "iamavaliduser" },
		"5b2f47da43492548593a2d0ecdc52f58",
		{ expiresIn: 60 * 60 },
		async (err, token) => {
			if (err) {
				console.log(err);
				return err;
			}
			return token;
		}
	);
};

const verifyToken = async (req, res, next) => {
	try {
		const bearerHeader = req.headers["authorization"];

		if (bearerHeader) {
			const bearer = bearerHeader.split(" ");
			const [, bearerToken] = bearer;
			req.token = bearerToken;
			await jwt.verify(
				req.token,
				"5b2f47da43492548593a2d0ecdc52f58",
				(err, authData) => {
					if (err) {
						return res
							.status(403)
							.json({ status: "error", message: "Unathorized Access" });
					} else {
						next();
					}
				}
			);
		} else {
			return res
				.status(403)
				.json({ status: "error", message: "Invalid token" });
		}
	} catch (err) {
		console.log("Error in Authorization", err);
		return res.status(403).json({ message: "Authorization failed" });
	}
};

module.exports = {
	verifyToken,
	generateAccessToken,
};
