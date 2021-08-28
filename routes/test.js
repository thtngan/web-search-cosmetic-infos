var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();
var sanpham = require('../models/db')
var multer = require('multer');
var fs = require('fs');
var path = require('path');

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'uploads')
  },
  filename: (req, file, cb) => {
      cb(null, file.fieldname + '-' + Date.now())
  }
});

var upload = multer({ storage: storage });

router.get('/', (req, res) => {
    sanpham.find({}, (err, items) => {
        if (err) {
            console.log(err);
            res.status(500).send('An error occurred', err);
        }
        else {
            res.render('imagesPage', { items: items });
        }
    });
});

router.post('/', upload.single('image'), (req, res, next) => {
 
    var obj = {
        Name: req.body.name,
        Skin: req.body.skin,
        Volume: req.body.volume,
        contraindications: req.body.contra,
        Ingredients: req.body.ingre,
        Description: req.body.desc,
        Type: req.body.type,
        Brand: req.body.brand,
        img: {
            data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
            contentType: 'image/png'
        }
    }
    sanpham.create(obj, (err, item) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log(item)
            res.redirect('/');
        }
    });
});

module.exports = router;