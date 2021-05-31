const db = require("../config/dbConnection");

const schema = {
	title: { type: db.SchemaTypes.String, required: true },
	yearly: { type: db.SchemaTypes.Boolean, required: true, default: false },
	year: { type: db.SchemaTypes.Number, default: new Date().getFullYear() },
	numberOfEpisodes: { type: db.SchemaTypes.Number, default: 0 },
	category: { type: db.SchemaTypes.ObjectId, ref: "Category" },
	episodes: [{ type: db.SchemaTypes.ObjectId, ref: "Episode" }],
	createdAt: { type: db.SchemaTypes.Date, default: Date.now },
	updatedAt: { type: db.SchemaTypes.Date, default: Date.now },
};

const lectureSchema = db.Schema(schema);
const Lecture = db.model("Lecture", lectureSchema);

module.exports = Lecture;
