var express = require('express');
var router = express.Router();
var mongoose = require('mongoose')
var subscribe = require('../models/subscribe')

router.post('/', (req, res) =>{
    subscribe.init();
    let newsub = new subscribe({
            Mail : req.body.email
    })
    newsub.save((err) => {
        if (err) 
        {
            console.log({ succes: false, message: 'Email already enrolled !' });
        }
        return;
    })
    res.redirect('back');
});

module.exports = router;