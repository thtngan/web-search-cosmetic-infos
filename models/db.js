var mongoose = require('mongoose');
 
const web = new mongoose.Schema({
    url:{
        type:String
    },
    img:
    {
        data: Buffer,
        contentType: String
    }
})

const sanPham = new mongoose.Schema({
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
    // Web:{
    //     type: [web],
    //     default: undefined
    // },
    Skin:{
        type:String
    },
    img:
    {
        data: Buffer,
        contentType: String
    },
    View:{
        Type:Number
    }
});
 
//Image is a model which has a schema imageSchema
 
module.exports = new mongoose.model('sanpham', sanPham, 'SanPham');