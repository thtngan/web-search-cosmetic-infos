const moongose = require("mongoose");

moongose.Promise = global.Promise;

const db = {};

db.mongoose = moongose;
db.user = require("./user.model");
db.role = require("./role.model");
db.ROLES = ["user", "admin"];

module.exports = db;