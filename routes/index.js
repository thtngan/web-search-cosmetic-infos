var express = require('express');
var router = express.Router();
var mongoose = require('mongoose')
var item = require('../models/db')
var shop = require('../models/shop')
/* GET home page */
router.get('/', (req, res) => {
    shop.find({}, (err, shops) => {
        item.find({Rating:{ $gte: 3.5}}, (err, products) => {
            res.render('index', {productList: products, shopList: shops})
        })
    })
});

router.get('/autocompleteIndex/', function (req, res, next) {
    var regex = new RegExp(req.query["term"], 'i');

    var productFilter = item.find({ Name: regex }).limit(5);
    productFilter.exec(function (err, data) {
        //console.log(data);
        var result = [];
        if (!err) {
            if (data && data.length && data.length > 0) {
                data.forEach(prod => {
                    console.log(prod);
                    let obj = {
                        id: prod._id,
                        label: prod.Name,
                        pictureData: prod.Img.data.toString('base64'),
                        pictureType: prod.Img.contentType
                    };
                    result.push(obj);
                });
            }
            else {
                let obj = {
                    label: 'Không tìm thấy sản phẩm',
                    pictureType: null
                }
                result.push(obj);
            }
            //console.log(result);
            res.jsonp(result);
        }
    });
});

module.exports = router;
