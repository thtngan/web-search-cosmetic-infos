var express = require('express');
var router = express.Router();
var mongoose = require('mongoose')
var product = require('../models/model')
const { verifyToken, isAdmin } = require("../middlewares/auth.jwt");

const db = require("../models");
const User = db.user;

var multer = require('multer');
var storage = multer.memoryStorage()
var upload = multer({ storage: storage });

const Comment = require('../models/comment');
const Subscription = require('../models/subscribe');
const Feedback = require('../models/feedback');
const item = require('../models/db')

/* GET admin page */
router.get('/', verifyToken, (req, res) => {
    item.find({}, (err, products) => {
        User.find({}, (err, users) => {
            Comment.find({}, (err, comments) => {
                Feedback.find({}, (err, feeds) => {
                    Subscription.find({}, (err, subs) => {
                        res.render('../views/admin/admin',
                            { prod: products.length, user: users.length, cmt: comments.length, feed: feeds.length, sub: subs.length })
                    })
                })
            })
        })
    })
});

/* PRODUCT page */
router.get('/products', verifyToken, function (req, res, next) {
    item.find({}, (err, prods) => {
        // console.log(users);
        res.render('../views/admin/adProduct', {
            productList: prods
        })
    })
});

/* ========= Add new product ========= */
router.post('/products/addNew', upload.single('image'), async (req, res) => {
    // var prod = req.body._id;
    // console.log(prod);
    console.log(req.body);
    console.log(req.file);

    var typeType;
    switch (req.body.type) {
        case "srm":
            typeType = "Sữa rửa mặt";
            break;
        case "Nước tẩy trang":
            typeType = "Nước tẩy trang";
            break;
        case "dtt":
            typeType = "Dầu tẩy trang";
            break;
        case "toner":
            typeType = "Nước hoa hồng";
            break;
        case "lotion":
            typeType = "Sữa dưỡng"
            break;
        case "es":
            typeType = "Essence"
            break;
        case "amp":
            typeType = "Ampoule"
            break;
        case "kcn":
            typeType = "Kem chống nắng"
            break;
        case "xcn":
            typeType = "Xịt chống nắng"
            break;
        case "xk":
            typeType = "Xịt khoáng"
            break;
        default:
            typeType = "";
            break;
    }
    var typeSkin;
    switch (req.body.typeSkin) {
        case "dd":
            typeSkin = "Da dầu";
            break;
        case "dk":
            typeSkin = "Da khô";
            break;
        case "dm":
            typeSkin = "Da mụn";
            break;
        case "dnc":
            typeSkin = "Da nhạy cảm";
            break;
        default:
            typeSkin = "";
            break;
    }

    // console.log(type);

    const prod = new item({
        Name: req.body.name,
        Skin: typeSkin,
        Volume: req.body.volume,
        Contraindications: req.body.contra,
        Ingredients: req.body.ingre,
        Description: req.body.desc,
        Type: typeType,
        Brand: req.body.brand,
        Web1: { "name": req.body.web1Name, "url": req.body.web1Url },
        Web2: { "name": req.body.web2Name, "url": req.body.web2Url },
        Web3: { "name": req.body.web3Name, "url": req.body.web3Url },
        Img: { "data": req.file.buffer, "ContentType": "png" }
    });

    prod.save()
        .then(data => {
            // res.send(data);
            res.redirect(`/admin/products/${data._id}`);
        }).catch(err => {
            res.status(500).send({
                message: err.message
            });
        });
    // res.redirect(`/admin/products/`)

});

//Show page add product
router.get('/products/info', (req, res) => {
    res.render('../views/admin/adProdAdd.ejs');
})

/* ========= Delete product ========= */
router.post('/products/delete/:id', function (req, res) {
    console.log('Delete a product: ' + JSON.stringify(req.body));

    //Delete from mongoDB
    item.findByIdAndRemove(req.params.id, function (err, docs) {
        if (err) {
            console.log(err)
        }
        else {
            console.log("Delete successfully: ", docs);
        }
    });

})

/* ========= Update product ========= */
router.post('/products/update', upload.single('image'), async (req, res) => {
    var prod = req.body._id;
    // console.log(prod);
    console.log(req.body);
    // console.log(req.file);

    var typeType;
    switch (req.body.type) {
        case "srm":
            typeType = "Sữa rửa mặt";
            break;
        case "ntt":
            typeType = "Nước tẩy trang"
            break;
        case "dtt":
            typeType = "Dầu tẩy trang";
            break;
        case "toner":
            typeType = "Nước hoa hồng";
            break;
        case "lotion":
            typeType = "Sữa dưỡng"
            break;
        case "es":
            typeType = "Essence"
            break;
        case "amp":
            typeType = "Ampoule"
            break;
        case "kcn":
            typeType = "Kem chống nắng"
            break;
        case "xcn":
            typeType = "Xịt chống nắng"
            break;
        case "xk":
            typeType = "Xịt khoáng"
            break;
        default:
            typeType = "";
            break;
    }
    // console.log(type);
    var typeSkin;
    switch (req.body.typeSkin) {
        case "dd":
            typeSkin = "Da dầu";
            break;
        case "dk":
            typeSkin = "Da khô";
            break;
        case "dm":
            typeSkin = "Da mụn";
            break;
        case "dnc":
            typeSkin = "Da nhạy cảm";
            break;
        default:
            typeSkin = "";
            break;
    }

    if (req.file) {
        item.updateOne({ _id: prod }, {
            $set: {
                // Name: req.body.name,
                Skin: typeSkin,
                Volume: req.body.volume,
                Contraindications: req.body.contra,
                Ingredients: req.body.ingre,
                Description: req.body.desc,
                Type: typeType,
                Brand: req.body.brand,
                Web1: { "name": req.body.web1Name, "url": req.body.web1Url },
                Web2: { "name": req.body.web2Name, "url": req.body.web2Url },
                Web3: { "name": req.body.web3Name, "url": req.body.web3Url },
                Img: { "data": req.file.buffer, "ContentType": "png" }
            }
        }, function (err, doc) {
            if (err) {
                console.log("Something wrong when updating data!");
                console.log(err)
            }
        })
    }
    else {
        item.updateOne({ _id: prod }, {
            $set: {
                // Name: req.body.name,
                Skin: typeSkin,
                Volume: req.body.volume,
                Contraindications: req.body.contra,
                Ingredients: req.body.ingre,
                Description: req.body.desc,
                Type: typeType,
                Brand: req.body.brand,
                Web1: { "name": req.body.web1Name, "url": req.body.web1Url },
                Web2: { "name": req.body.web2Name, "url": req.body.web2Url },
                Web3: { "name": req.body.web3Name, "url": req.body.web3Url }
            }
        }, function (err, doc) {
            if (err) {
                console.log("Something wrong when updating data!");
                console.log(err)
            }
        })
    }
    res.redirect(`/admin/products/${prod}`)
});
router.post('/products/post', async (req, res) => {
    var prod = req.body.prodId;
    // console.log(prod);
    item.find({ _id: prod }, (err, products) => {
        // console.log(products);
        res.send({
            prod: products
        })
    })
});
router.get('/products/:id', async (req, res) => {
    var prod = req.params.id;
    // console.log(prod);
    item.find({ _id: prod }, (err, products) => {
        res.render('../views/admin/adProdInfo', {
            productList: products
        })
    })
});



/* USER page */
router.get('/users', verifyToken, isAdmin, function (req, res, next) {
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
router.get('/subs', verifyToken, (req, res) => {
    // res.render('../views/admin/adComment')
    Subscription.find({}, (err, sub) => {
        res.render('../views/admin/adSubscript', {
            subList: sub
        })
    })
});

/* FEEBACK page */
router.get('/feeds', verifyToken, (req, res) => {
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
router.get('/comments', verifyToken, (req, res) => {
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
