const db = require("../config/dbConnection");

const schema = {
	firstName: { type: db.SchemaTypes.String, required: true },
	lastName: { type: db.SchemaTypes.String, required: true },
	phoneNumber: {
		type: db.SchemaTypes.String,
		required: true,
		unique: true,
	},
	emailAddress: { type: db.SchemaTypes.String, unique: true },
	password: { type: db.SchemaTypes.String },
	role: { type: db.SchemaTypes.ObjectId, ref: "Role" },
	createdAt: { type: db.SchemaTypes.Date, default: Date.now },
	updatedAt: { type: db.SchemaTypes.Date, default: Date.now },
};

const userSchema = db.Schema(schema);
const User = db.model("User", userSchema);

module.exports = User;
