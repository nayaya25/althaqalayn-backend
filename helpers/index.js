const { userService, roleService } = require("../services");
const bcrypt = require("bcrypt");

exports.getFileName = async (filePath) => {
	const [, splitted] = filePath.split("//");
	const [, fileName] = splitted.split("/");
	return fileName;
};

exports.initSuperUser = async () => {
	const encPass = await bcrypt.hash("superuser", 10);
	let role, user;
	try {
		role = await roleService.getRoleByName("super-admin");
		if (!role) role = await roleService.createRole({ name: "super-admin" });

		const { _id } = role;
		user = await userService.getAUserByMail("admin@example.com");
		if (!user)
			user = await userService.createUser({
				firstName: "Super",
				lastName: "Admin",
				emailAddress: "admin@example.com",
				phoneNumber: "08012345678",
				password: encPass,
				role: _id,
			});
	} catch (error) {}
};
