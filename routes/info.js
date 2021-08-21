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
    console.log(req.params.name)
    // var sp = await product.find({"Name": "${req.params.name}"})
    // console.log(sp);
    // res.render('about')
    // Name: ${req.params.name}
    var prod = req.params.name;
    product.find({ Name: prod }, (err, products) => {
        console.log(products)
        recommend.find({Type: products[0].Type, Name: { $ne: products[0].Name}},(err, recommends) =>{
            console.log(recommends);
            console.log(products);
        })
        // res.render('index', {
        //     productList : products
        // })
        res.render('about');
    })
});
module.exports = router;