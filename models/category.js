const db = require("../config/dbConnection");
const Lecture = require("./lecture");

const schema = {
	name: { type: db.SchemaTypes.String, unique: true, required: true },
	description: { type: db.SchemaTypes.String },
	lectures: [{ type: db.SchemaTypes.ObjectId, ref: "Lecture" }],
	createdAt: { type: db.SchemaTypes.Date, default: Date.now },
	updatedAt: { type: db.SchemaTypes.Date, default: Date.now },
};

const categorySchema = db.Schema(schema);

categorySchema.pre("deleteOne", { document: false, query: true }, async () => {
	const cat = await this.model.findOne(this.getFilter());
	await Lecture.deleteMany({ category: cat._id });
});

const Category = db.model("Category", categorySchema);

module.exports = Category;
