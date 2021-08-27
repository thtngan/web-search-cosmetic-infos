var express = require('express');
var router = express.Router();
var mongoose = require('mongoose')
var product = require('../models/model')

const db = require("../models");
const User = db.user;

/* GET admin page */
router.get('/', (req, res) => {
    res.render('../views/admin/admin')
});

router.get('/products', (req, res) => {
    res.render('../views/admin/adProduct')
})

router.get('/users', function (req, res, next) {
    User.find({}, (err, users) => {
        // console.log(users);
        res.render('../views/admin/adUser', {
            userList: users
        })
    })

});

router.post('/users/save', function (req, res) {
    console.log('Post a User: ' + JSON.stringify(req.body));
    //Create user
    const user = new User({
        userId: req.body.userId,
        username: req.body.username,
        password: req.body.password,
        role: req.body.role
    });
    console.log(user);

    //Save to mongoDB
    user.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message
            });
        });
})

module.exports = router;
//================================================================



const notesSchema = {
    inputName: String,
    inputAccount: String,
    password: String
}

const Note = mongoose.model("Note", notesSchema);

router.post('/users', async (req, res) => {
    let newNote = await new Note({
        inputName: req.body.inputName,
        inputAccount: req.body.inputAccount,
        password: req.body.password
    })
    newNote.save();
    res.redirect('/users');
})