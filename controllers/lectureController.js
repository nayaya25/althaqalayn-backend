const { lectureService } = require("../services");

const getAll = async (req, res) => {
	try {
		const lectures = await lectureService.getAllCategories();
		res.status(200).json({
			status: "success",
			message: "Lectures Fetch Successful",
			lectures,
		});
	} catch (error) {
		console.log({ error });
		res.status(500).json({ status: "error", message: "Server Error" });
	}
};

module.exports = {
	getAll,
};
