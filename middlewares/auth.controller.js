const db = require("../models");
var jwt = require("jsonwebtoken");
const config = require("../config/auth");

const User = db.user;

exports.signin = (req, res) => {
	console.log(req.body);
	User.findOne({
		userId: req.body.userId
	})
	.populate("roles", "-__v")
	.exec((err, user) => {
		if(err) {
			res.status(500).send({message: err});
			return;
		}
		if(!user) {
			return res.status(404).send({message: "Mã nhân viên không tồn tại!"});
		}
		var passwordIsValid = req.body.password == user.password;
		if(!passwordIsValid) {
			return res.status(401).send({message: "Sai mật khẩu!"});
		}
		var token = jwt.sign({ id: user.id }, config.secret, {
			expiresIn: 86400
		});
		res.status(200).send({
			message: "Xin chào " + user.username,
			id: user._id,
			username: user.username,
			roles: user.role,
			acessToken: token
		});
	});
};