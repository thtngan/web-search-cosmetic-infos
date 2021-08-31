const jwt = require("jsonwebtoken");
const config = require("../config/auth");
const db = require("../models");
const User = db.user;

function verifyToken(req, res, next) {
    // let token = req.headers["x-access-token"];
    let token = req.query.token;
    if (!token) {
        return res.status(403).send({ message: 'Need to signin' });
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: "Unauthorized!" });
        }
        req.userId = decoded.id;
        next();
    });
};
function isAdmin(req, res, next) {
    User.findById(req.userId).exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        if (user.role === 0) {
            next();
            return;
        }
        res.status(403).send({ message: "Not Allow" })
        return;

    });
};

module.exports = {
    verifyToken,
    isAdmin
};