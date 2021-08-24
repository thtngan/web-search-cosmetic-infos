const db = require("../models");

const User = db.user;
const Role = db.role;

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
		var authorities = [];
		for(let i = 0; i < user.roles.length; i++) {
			authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
		}
		res.status(200).send({
			message: "Xin chào " + user.username,
			id: user._id,
			username: user.username,
			roles: authorities
		});
	});
};