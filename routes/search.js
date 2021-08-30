var express = require('express');
var router = express.Router();
var mongoose = require('mongoose')
var product = require('../models/model')
var item = require('../models/db')


/* GET users listing. */
router.get('/', function (req, res, next) {
    res.render('search');
});

router.get('/autocompleteSearch/', function (req, res, next) {
    var regex = new RegExp(req.query["term"], 'i');

    var productFilter = item.find({ Name: regex });
    productFilter.exec(function (err, data) {
        //console.log(data);
        var result = [];
        if (!err) {
            if (data && data.length && data.length > 0) {
                data.forEach(prod => {
                    //console.log(prod);
                    let obj = {
                        id: prod._id,
                        label: prod.Name,
                        pictureData: prod.Img.data.toString('base64'),
                        pictureType: prod.Img.contentType,
                        skin: prod.Skin
                    };
                    result.push(obj);
                });
            }
            else {
                let obj = {
                    label: 'Không tìm thấy sản phẩm',
                    picture: null,
                    skin: null
                }
                result.push(obj);
            }
            //console.log(result);
            res.jsonp(result);
        }
    });
});

module.exports = router;
