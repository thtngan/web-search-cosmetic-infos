var express = require('express');
var router = express.Router();
var mongoose = require('mongoose')
var product = require('../models/model')
var feedback = require('../models/feedback')

/* GET home page */
router.get('/', (req, res) => {
        res.render('about')
});

router.post('/fb', (req, res) =>{
        feedback.init();
        var today = new Date();
        let date = today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear();
        console.log(date);
        let newfb = new feedback({
                Name : req.body.name,
                Number: req.body.phone,
                Mail: req.body.email,
                Title: req.body.title,
                Details: req.body.content,
                Date: date
        })
        newfb.save();
        res.redirect('/about');
    });

module.exports = router;