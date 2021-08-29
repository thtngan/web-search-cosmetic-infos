var express = require('express');
var router = express.Router();
var mongoose = require('mongoose')
var product = require('../models/model')
const { authUser } = require('../middlewares/basicAuth')
const db = require("../models");
const User = db.user;

/* GET admin page */
router.get('/', (req, res) => {
    res.render('../views/admin/admin')
});

router.get('/products', (req, res) => {
    res.render('../views/admin/adProduct')
});

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

module.exports = router;
