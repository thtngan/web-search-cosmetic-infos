var express = require('express');
var router = express.Router();
var mongoose = require('mongoose')
var product = require('../models/model')
var user = require('../models/user.model')

/* GET admin page */
router.get('/', (req, res) => {
    res.render('../views/admin/admin')
});

router.get('/products', (req, res) => {
    res.render('../views/admin/adProduct')
})

router.get('/users', function (req, res, next) {
    var productFilter = product.find({});

    user.find({ View: { $eq: 0 } }, (err, products) => {
        console.log(products);
        res.render('../views/admin/adUser', { name: products });
    })
});

module.exports = router;