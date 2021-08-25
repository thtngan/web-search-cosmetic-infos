var mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
    // _id: mongoose.Schema.Types.ObjectId,
    "Name" :{
        type: String
    },
    "Number":{
        type: String
    },
    "Mail":{
        type: String
    },
    "Title":{
        type: String
    },
    "Details":{
        type: String
    },
    "Date":{
        type: String,
    }
});

module.exports = mongoose.model('feedback', feedbackSchema,'dbfeedback')