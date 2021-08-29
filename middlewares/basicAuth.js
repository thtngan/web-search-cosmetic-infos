const db = require("../models");

const User = db.user;
const Role = db.role;

function authUser(req, res, next) {
    if (req.body.user == null) {
      res.status(403)
      return res.send('You need to sign in')
    }
    next()
}
module.exports = {
    authUser
}