var express = require('express');
var router = express.Router();
var mongoose = require('mongoose')
var product = require('../models/model')

/* GET home page */
router.get('/', (req, res) => {
        res.render('about')
});

module.exports = router;