const { categoryService } = require("../services");

const getAll = async (req, res) => {
	try {
		const categories = await categoryService.getAllCategories();
        res.status(200).json({status: "success", "Categories Fetch Successful"})
	} catch (error) {
		console.log({ error });
		res.status(500).json({ status: "error", message: "Server Error" });
	}
};

module.exports = {
    getAll
}
