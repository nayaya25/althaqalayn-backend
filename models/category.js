const db = require("../config/dbConnection");

const schema = {
	name: { type: db.SchemaTypes.String, required: true },
	description: { type: db.SchemaTypes.String },
	lecture: [{ type: db.SchemaTypes.ObjectId, ref: "Lecture" }],
	createdAt: { type: db.SchemaTypes.Date, default: Date.now },
	updatedAt: { type: db.SchemaTypes.Date, default: Date.now },
};

const categorySchema = db.Schema(schema);
const Category = db.model("Category", categorySchema);

module.exports = Category;
