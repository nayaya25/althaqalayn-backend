const db = require("../config/dbConnection");

const schema = {
	name: { type: db.SchemaTypes.String, required: true, unique: true },
	createdAt: { type: db.SchemaTypes.Date, default: Date.now },
	updatedAt: { type: db.SchemaTypes.Date, default: Date.now },
};

const roleSchema = db.Schema(schema);
const Role = db.model("Role", roleSchema);

module.exports = Role;
