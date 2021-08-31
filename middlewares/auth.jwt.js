const jwt = require("jsonwebtoken");
const config = require("../config/auth");
const db = require("../models");
const User = db.user;

function verifyToken(req, res, next) {
    // let token = req.headers["x-access-token"];
    let token = req.query.token;
    if (!token) {
        res.status(403)
        return res.render('forbidden',{ message: 'Need to signin', code: '403'})
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            res.status(401);
            return res.render('forbidden',{ message: 'Unauthorized!', code: '401'})
        }
        req.userId = decoded.id;
        next();
    });
};
function isAdmin(req, res, next) {
    User.findById(req.userId).exec((err, user) => {
        if (err) {
            res.status(500)
            res.render('forbidden',{ message: err, code: '500'})
            return;
        }
        if (user.role === 0) {
            next();
            return;
        }
        res.status(403)
        res.render('forbidden',{ message: 'Not Allow', code: '403'})
        return;

    });
};

module.exports = {
    verifyToken,
    isAdmin
};