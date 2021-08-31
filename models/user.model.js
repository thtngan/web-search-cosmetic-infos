const mongoose = require("mongoose");

const User = mongoose.model(
	"User",
	new mongoose.Schema({
		userId: String,
		username: String,
		password: String,
		role: Number
	})
);

module.exports = User;