var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
const webSchema = new mongoose.Schema({
    Url1:{
        type:String
    },
    Url2:{
        type:String
    }
})
const imgSchema = new mongoose.Schema({
    Url1:{
        type:String
    },
    Url2:{
        type:String
    }
})
const productSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    Name:{
        type:String
    },
    Brand:{
        type:String
    },
    Type:{
        type:String
    },
    Description:{
        type:String
    },
    Ingredients:{
        type:String
    },
    contraindications:{
        type:String
    },
    Volume:{
        type:String
    },
    Web:{
        type: [webSchema],
        default: undefined
    },
    Skin:{
        type:String
    },
    Photos:{
        type: [imgSchema],
        default: undefined
    },
    View:{
        Type:Number
    }
});

module.exports = mongoose.model('product', productSchema,'dbcosmetic')