const db = require("../models");

const User = db.user;
const Role = db.role;
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
	const user = new User({
		email: req.body.email,
		username: req.body.username,
		password: req.body.password
	});
	console.log(user);
	user.save((err, user) => {
		if(err) {
			res.status(500).send({message: err});
			return;
		}
		Role.findOne({name: "user"}, (err, role) => {
			if(err) {
				res.status(500).send({message: err});
				return;
			}
			user.roles = [role._id];
			user.save(err => {
				if(err) {
					res.status(500).send({message: err});
				} else {
					res.status(200).send({message: "Đăng ký tài khoản mới thành công!"});
				}
			});
		});
	});
};

exports.signin = (req, res) => {
	console.log(req.body);
	User.findOne({
		email: req.body.email
	})
	.populate("roles", "-__v")
	.exec((err, user) => {
		if(err) {
			res.status(500).send({message: err});
			return;
		}
		if(!user) {
			return res.status(404).send({message: "Tài khoản không tồn tại!"});
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