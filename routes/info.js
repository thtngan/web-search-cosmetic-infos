var express = require('express');
var router = express.Router();
var mongoose = require('mongoose')
var product = require('../models/model')
var recommend = require('../models/model')
var comment = require('../models/comment')
// var add = require('../models/comment')
/* GET home page */
router.get('/', (req, res) => {
        res.render('index')
});


router.get('/:name',async (req, res) => {
    var prod = req.params.name;
    product.find({ Name: prod }, (err, products) => {
        // console.log(products)
        recommend.find({Type: products[0].Type, Name: { $ne: products[0].Name}},(err, recommends) =>{
            comment.find({Product: prod}, (err, comments) =>{
                // console.log(comments)
                let a = 0;
                let b = 0;
                let c = 0;
                let d = 0;
                let e = 0;
                comments.forEach ((cmt) => {
                    if (cmt.Rating == 1){
                        a = a + 1;
                    }
                    else if (cmt.Rating == 2){
                        b = b + 1;
                    }
                    else if (cmt.Rating == 3){
                        c = c + 1;
                    }
                    else if (cmt.Rating == 4){
                        d = d + 1;
                    }
                    else{
                        e = e + 1;
                    }    
                });
                let total = {"one" : a, "two" : b , "three" : c, "four": d, "five": e};
                res.render('info',{prod: products, recomm: recommends, cmt: comments, rate: total})
            })
        })
    })
});

router.post('/:name/cmt', (req, res) =>{
    var prod = req.params.name;
    console.log(prod)
    console.log(req.params.name.toString())
    var today = new Date();
    let date = today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear();
    var time = today.getHours() + ":" + today.getMinutes();
    var newcmt = new comment({
        Product: req.params.name,
        Name: req.body.name,
        Mail: req.body.email,
        Rating: parseInt(req.body.rating),
        Details: req.body.comment,
        Date: date,
        Time: time,
    });
        console.log(newcmt)
        newcmt.save(function (err, cmt) {
            if (err) 
                return console.error(err);
            console.log(cmt.Name + " saved to collection.");
        });
        res.redirect(`/info/${prod}`);
    });

module.exports = router;