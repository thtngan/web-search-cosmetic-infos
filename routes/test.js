var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();
var item = require('../models/db')
var multer = require('multer');
var storage = multer.memoryStorage()
var upload = multer({ storage: storage });
var fs = require('fs');
var path = require('path');

// var storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         console.log('smth file=>', file);
//         cb(null, './uploads/');
//     },
//     filename: (req, file, cb) => {
//         cb(null, file.originalname)
//     }
// });

// var upload = multer({ storage: storage });

router.get('/', (req, res) => {
    item.find({}, (err, items) => {
        if (err) {
            console.log(err);
            res.status(500).send('An error occurred', err);
        }
        else {
            res.render('imagesPage', { items: items });
        }
    });
});

router.post('/upload', upload.single('images'), (req, res, next) => {
    console.log(req.file);
    console.log(req.body);
    var obj = new item({
        Name: req.body.name,
        Skin: req.body.skin,
        Volume: req.body.volume,
        Contraindications: req.body.contra,
        Ingredients: req.body.ingre,
        Description: req.body.desc,
        Type: req.body.type,
        Brand: req.body.brand,
    })
    console.log("done1")
    obj.Web1 = {"name" : req.body.web1Name, "url": req.body.web1Url}
    obj.Web2 = {"name" : req.body.web2Name, "url": req.body.web2Url}
    obj.Web3 = {"name" : req.body.web3Name, "url": req.body.web3Url}
    console.log("done2")
    // obj.Web1.name = req.body.web1Name,
    // obj.Web1.url = req.body.web1Url,
    // obj.Web2.name = req.body.web2Name,
    // obj.Web2.url = req.body.web2Url,
    // obj.Web3.name = req.body.web3Name,
    // obj.Web3.url = req.body.web3Url,
    obj.Img.data = req.file.buffer;
    obj.Img.contentType = "png";
    console.log(obj)
    obj.save();
    console.log("done final")
    res.render('imagesPage')
    // console.log(req.files[0].buffer);
    // console.log(req.files[1].buffer);
    // console.log(req.files[2].buffer);
    // obj.Img.data = req.file.buffer;
    // obj.Img.contentType = "png";
    // console.log(obj);
    // obj.save();
    /** A better way to copy the uploaded file. **/
    // var tmp_path = req.file.path;
    // var target_path = 'uploads/' + req.file.originalname;

    // var src = fs.createReadStream(tmp_path);
    // var dest = fs.createWriteStream(target_path);
    // src.pipe(dest);
    // src.on('end', function () { res.render('imagesPage'); });
});

router.get('/show', (req, res) => {
    item.find({}, (err, items) => {
        console.log(items)
        if (err) {
            console.log(err);
            res.status(500).send('An error occurred', err);
        }
        else {
            res.render('showTest', { items: items });
        }
    });
});
module.exports = router;