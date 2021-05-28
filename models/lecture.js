const db = require("../config/dbConnection");

const schema = {
	title: { type: db.SchemaTypes.String, required: true },
	yearly: { type: db.SchemaTypes.Boolean, required: true, default: false },
	year: {},
	numberOfEpisodes: {},
	episode: [{ type: db.SchemaTypes.ObjectId, ref: "Episode" }],
	category: { type: db.SchemaTypes.ObjectId, ref: "Category" },
	createdAt: { type: db.SchemaTypes.Date, default: Date.now },
	updatedAt: { type: db.SchemaTypes.Date, default: Date.now },
};

const lectureSchema = db.Schema(schema);
const Lecture = db.model("Lecture", lectureSchema);

module.exports = Lecture;
