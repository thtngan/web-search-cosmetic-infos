const moongose = require("mongoose");

moongose.Promise = global.Promise;

const db = {};

db.mongoose = moongose;
db.user = require("./user.model");

module.exports = db;