var express = require('express');
var router = express.Router();
var mongoose = require('mongoose')
var product = require('../models/model')
var recommend = require('../models/model')
/* GET home page */
router.get('/', (req, res) => {
        res.render('index')
});


router.get('/:name',async (req, res) => {
    var prod = req.params.name;
    product.find({ Name: prod }, (err, products) => {
        console.log(products)
        recommend.find({Type: products[0].Type, Name: { $ne: products[0].Name}},(err, recommends) =>{
            res.render('info',{prod: products, recomm: recommends})
        })
    })
});
module.exports = router;