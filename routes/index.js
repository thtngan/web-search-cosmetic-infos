var express = require('express');
var router = express.Router();
var mongoose = require('mongoose')
var product = require('../models/model')

/* GET home page */
router.get('/', (req, res) => {
    product.find({}, (err, products) => {
        res.render('index', {
            productList : products
        })
    })
});

module.exports = router;
