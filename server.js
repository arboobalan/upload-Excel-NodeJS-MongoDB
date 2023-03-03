const express = require('express');
const path = require('path');
const multer = require('multer');
const fs = require('fs');
const app = express();
const File = require('./model/excel')

//MiddleWare
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'views')));
app.set('view engine', 'ejs');

//DB
require('./config/db');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

//var upload = multer({ storage: storage }).single('path');

const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        if (ext !== '.csv') {
            return cb(new Error('Only CSV files are allowed'));
        }
        cb(null, true);
    }
}).single('path');

app.post('/excelForm', function (req, res) {
    upload(req, res, function (err) {
        if (err) {
            console.log(err);
            return res.status(400).send(err.message);
        }

        const file = new File({
            path: req.file.path
        });

        file.save()
            .then(() => {
                res.redirect('/');
            })
            .catch((err) => {
                console.log(err);
                res.status(500).send(err.message);
            });
    });
});

app.get('/', function (req, res) {
    File.find({}, function (err, files) {
        if (err) {
            console.log(err);
            return res.status(500).send(err.message);
        }

        res.render('index', { files: files });
    });
});

port = 1001;

app.listen(port, (req, res) => {
    console.log(`=> http://localhost:${port}`);
});