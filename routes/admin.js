var express = require('express');
var router = express.Router();
var mongoose = require('mongoose')
var product = require('../models/model')
const { authUser } = require('../middlewares/basicAuth')

const db = require("../models");
const User = db.user;

const Comment = require('../models/comment');
const Subscription = require('../models/subscribe');
const Feedback = require('../models/feedback');
const item = require('../models/db')

/* GET admin page */
router.get('/', (req, res) => {
    res.render('../views/admin/admin')
});

/* PRODUCT page */
router.get('/products', function (req, res, next) {
    item.find({}, (err, prods) => {
        // console.log(users);
        res.render('../views/admin/adProduct', {
            productList: prods
        })
    })
});

router.get('/products/:id', async (req, res) => {
    var prod = req.params.id;
    // console.log(prod);
    item.find({ _id: prod }, (err, products) => {
        res.render('../views/admin/adProdInfo', {
            prod: products
        })
    })
});

//== **** Show data in prodInfo
router.post('/products/post', async (req, res) => {
    var prod = req.body.prodId;
    console.log(prod);
    item.find({ _id: prod }, (err, products) => {
        // console.log(products);
        res.send({
            prod: products
        })
    })
});

/* USER page */
router.get('/users', function (req, res, next) {
    User.find({}, (err, users) => {
        // console.log(users);
        res.render('../views/admin/adUser', {
            userList: users
        })
    })

});

router.post('/users/save', function (req, res) {
    console.log('Save a User: ' + JSON.stringify(req.body));
    //Create user
    const user = new User({
        userId: req.body.userId,
        username: req.body.username,
        password: req.body.password,
        role: req.body.role
    });
    // console.log(user);

    //Save to mongoDB
    user.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message
            });
        });
});

router.post('/users/delete/:id', function (req, res) {
    console.log('Delete a User: ' + JSON.stringify(req.body));

    //Delete from mongoDB
    User.findByIdAndRemove(req.params.id, function (err, docs) {
        if (err) {
            console.log(err)
        }
        else {
            console.log("Delete successfully: ", docs);
        }
    });

})

router.put('/users/update', function (req, res) {
    console.log('Update a User: ' + JSON.stringify(req.body));

    //Create user
    const newUser = { $set: { username: req.body.username, password: req.body.password, role: req.body.role } };

    //Update to mongoDB
    User.updateOne({ userId: req.body.userId }, newUser, (err, docs) => {
        if (err) {
            console.log(err)
        }
        else {
            console.log("Update successfully: ", docs);
        }
    }
    );
})

/* SUBSCRIPTION page */
router.get('/subs', (req, res) => {
    // res.render('../views/admin/adComment')
    Subscription.find({}, (err, sub) => {
        res.render('../views/admin/adSubscript', {
            subList: sub
        })
    })
});

/* FEEBACK page */
router.get('/feeds', (req, res) => {
    // res.render('../views/admin/adComment')
    Feedback.find({}, (err, fds) => {
        res.render('../views/admin/adFeedback', {
            feedList: fds
        })
    })
});

router.post('/feeds/delete/:id', function (req, res) {
    console.log('Delete a feedback: ' + JSON.stringify(req.body));

    //Delete from mongoDB
    Feedback.findByIdAndRemove(req.params.id, function (err, docs) {
        if (err) {
            console.log(err)
        }
        else {
            console.log("Delete successfully: ", docs);
        }
    });

})

/* COMMENT page */
router.get('/comments', (req, res) => {
    // res.render('../views/admin/adComment')
    Comment.find({}, (err, cmts) => {
        res.render('../views/admin/adComment', {
            commentList: cmts
        })
    })
});

router.post('/comments/delete/:id', function (req, res) {
    console.log('Delete a comment: ' + JSON.stringify(req.body));

    //Delete from mongoDB
    Comment.findByIdAndRemove(req.params.id, function (err, docs) {
        if (err) {
            console.log(err)
        }
        else {
            console.log("Delete successfully: ", docs);
        }
    });

})




module.exports = router;
