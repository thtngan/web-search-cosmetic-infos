var mongoose = require('mongoose');

const shopSchema = new mongoose.Schema({
    // _id: mongoose.Schema.Types.ObjectId,
    "Name" :{
        type: String
    },
    "Link":{
        type: String
    },
    "Img":{
        type: String
    }
});

module.exports = mongoose.model('shop', shopSchema,'dbshop')