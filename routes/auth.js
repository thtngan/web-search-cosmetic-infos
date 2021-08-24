const checkDuplicateUsername = require("../middlewares/verifySignUp");
const controller = require("../middlewares/auth.controller");

module.exports = function(app) {
	app.use(function(req, res, next) {
	res.header(
	      "Access-Control-Allow-Headers",
	      "x-access-token, Origin, Content-Type, Accept"
	    );
	    next();
	});
	app.post("/signup",
		[
			checkDuplicateUsername
		],
		controller.signup);
	app.post("/signin", controller.signin);
};