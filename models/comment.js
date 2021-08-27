var mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    // _id: mongoose.Schema.Types.ObjectId,
    "Product":{
        type: String,
    },
    "Name" :{
        type: String
    },
    "Rating":{
        type: Number
    },
    "Mail":{
        type: String,
        Unique:true,
        required: true
    },
    "Details":{
        type: String
    },
    "Date":{
        type: String,
    },
    "Time":{
        type: String
    }
});

module.exports = mongoose.model('comment', commentSchema,'comments')