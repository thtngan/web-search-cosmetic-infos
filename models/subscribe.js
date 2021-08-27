var mongoose = require('mongoose');

const subscribeSchema = new mongoose.Schema({
    // _id: mongoose.Schema.Types.ObjectId,
    "Mail":{
        type: String,
        unique: true
    }
});

module.exports = mongoose.model('subscribe', subscribeSchema,'subscribes')