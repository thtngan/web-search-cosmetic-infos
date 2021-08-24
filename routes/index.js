var express = require('express');
var router = express.Router();
var mongoose = require('mongoose')
var product = require('../models/model')

/* GET home page */
router.get('/', (req, res) => {
    product.find({ View: { $eq: 0 } }, (err, products) => {
        res.render('index', {
            productList : products
        })
    })
});

router.get('/autocomplete/', function(req, res, next) {
    var regex = new RegExp(req.query["term"], 'i');
    
    var productFilter = product.find({Name:regex}).limit(5);
    productFilter.exec(function(err, data){
        //console.log(data);
        var result =[];
        if (!err){
            if (data && data.length && data.length >0){
               data.forEach(prod =>{
                   //console.log(prod);
                    let obj = {
                        id: prod._id,
                        label: prod.Name,
                        picture: prod.Photos[0].Url1
                    };
                    result.push(obj);
               });
            }
            else{
                let obj = {
                    label: 'Không tìm thấy sản phẩm',
                    picture: null
                }
                result.push(obj);
            }
            //console.log(result);
            res.jsonp(result);
        }
    });
});

module.exports = router;
