var mongoose = require('mongoose');
 
const web = new mongoose.Schema({
    url:{
        type:String
    },
    name:{
        type:String
    }
})

const item = new mongoose.Schema({
    // _id: mongoose.Schema.Types.ObjectId,
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
    Contraindications:{
        type:String
    },
    Volume:{
        type:String
    },
    Skin:{
        type:String
    },
    Img:
    {
        data: Buffer,
        contentType: String
    },
    Web1:{
        type: web
    },
    Web2:{
        type: web
    },
    Web3:{
        type: web
    },
    Rating: mongoose.Decimal128
});
 
//Image is a model which has a schema imageSchema
 
module.exports = new mongoose.model('item', item, 'dbItems');