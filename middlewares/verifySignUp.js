const db = require("../models");

const User = db.user;

checkDuplicateUsername = (req, res, next) => {
	User.findOne({
		email: req.body.email
	}).exec((err, user) => {
		if(err) {
			res.status(500).send({message: err});
			return;
		}
		if(user) {
			res.status(400).send({ message: "Email này đã được sử dụng" });
			return;
		}
		next();
	});
};

module.exports = checkDuplicateUsername;