const db = require("../config/dbConnection");

const schema = {
	title: { type: db.SchemaTypes.String, required: true },
	filePath: { type: db.SchemaTypes.String, required: true },
	lecture: { type: db.SchemaTypes.ObjectId, ref: "Lecture" },
	createdAt: { type: db.SchemaTypes.Date, default: Date.now },
	updatedAt: { type: db.SchemaTypes.Date, default: Date.now },
};

const EpisodeSchema = db.Schema(schema);
const Episode = db.model("Episode", EpisodeSchema);

module.exports = Episode;
