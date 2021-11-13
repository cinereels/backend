"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var path_1 = __importDefault(require("path"));
var body_parser_1 = require("body-parser");
var express_1 = __importDefault(require("express"));
var multer_1 = __importDefault(require("multer"));
var app = (0, express_1.default)();
exports.app = app;
var storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
            cb(null, 'images');
        }
        else if (file.mimetype === 'video/mp4' || file.mimetype === 'video/x-flv') {
            cb(null, 'videos');
        }
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString() + '-' + file.originalname);
    },
});
var fileFilter = function (req, file, cb) {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'video/mp4' || file.mimetype === 'video/x-flv') {
        cb(null, true);
    }
    else {
        cb(null, false);
    }
};
app.use((0, multer_1.default)({ storage: storage, fileFilter: fileFilter }).any());
app.use('/images', express_1.default.static(path_1.default.join(__dirname, 'images')));
app.use('/videos', express_1.default.static(path_1.default.join(__dirname, 'videos')));
app.set('trust proxy', true);
app.use((0, body_parser_1.json)());
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});
app.all('*', function (req, res) {
    console.log(req.path);
    throw new Error('API route not found!');
});
app.use(function (err, req, res, next) {
    console.log('Something went wrong!');
    if (err) {
        console.log(err.message);
        return res.status(400).send({
            message: err.message,
        });
    }
    res.status(400).send({
        message: 'Something went wrong!',
    });
});
