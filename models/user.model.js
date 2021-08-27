const mongoose = require("mongoose");

const User = mongoose.model(
	"User",
	new mongoose.Schema({
		userId: String,
		username: String,
		password: String,
		roles: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Role"
			}
		],
		role: Number
	})
);

module.exports = User;