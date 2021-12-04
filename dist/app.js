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
var channel_1 = require("./src/routes/channel");
var create_1 = require("./src/routes/channel/create");
var show_1 = require("./src/routes/channel/show");
var update_1 = require("./src/routes/channel/update");
var delete_1 = require("./src/routes/channel/delete");
var gallery_1 = require("./src/routes/gallery");
var create_2 = require("./src/routes/gallery/create");
var show_2 = require("./src/routes/gallery/show");
var delete_2 = require("./src/routes/gallery/delete");
var update_2 = require("./src/routes/gallery/update");
var current_user_1 = require("./src/middlewares/current-user");
var login_1 = require("./src/routes/auth/login");
var signup_1 = require("./src/routes/auth/signup");
var user_1 = require("./src/routes/user");
var show_3 = require("./src/routes/user/show");
var update_3 = require("./src/routes/user/update");
var delete_3 = require("./src/routes/user/delete");
var create_3 = require("./src/routes/movie/create");
var movie_1 = require("./src/routes/movie");
var show_4 = require("./src/routes/movie/show");
var update_4 = require("./src/routes/movie/update");
var delete_4 = require("./src/routes/movie/delete");
var create_4 = require("./src/routes/series/create");
var series_1 = require("./src/routes/series");
var show_5 = require("./src/routes/series/show");
var update_5 = require("./src/routes/series/update");
var delete_5 = require("./src/routes/series/delete");
var create_5 = require("./src/routes/season/create");
var season_1 = require("./src/routes/season");
var show_6 = require("./src/routes/season/show");
var update_6 = require("./src/routes/season/update");
var delete_6 = require("./src/routes/season/delete");
var create_6 = require("./src/routes/episode/create");
var show_7 = require("./src/routes/episode/show");
var episode_1 = require("./src/routes/episode");
var update_7 = require("./src/routes/episode/update");
var delete_7 = require("./src/routes/episode/delete");
var create_7 = require("./src/routes/search/create");
var search_1 = require("./src/routes/search");
var show_8 = require("./src/routes/search/show");
var delete_8 = require("./src/routes/search/delete");
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
app.use(current_user_1.currentUser);
app.use(channel_1.ChannelIndexRouter);
app.use(create_1.ChannelCreateRouter);
app.use(show_1.ChannelShowRouter);
app.use(update_1.ChannelUpdateRouter);
app.use(delete_1.ChannelDeleteRouter);
app.use(gallery_1.GalleryIndexRouter);
app.use(create_2.GalleryCreateRouter);
app.use(show_2.GalleryShowRouter);
app.use(update_2.GalleryUpdateRouter);
app.use(delete_2.GalleryDeleteRouter);
app.use(login_1.LoginRouter);
app.use(signup_1.SignupRouter);
app.use(user_1.UserIndexRouter);
app.use(show_3.UserShowRouter);
app.use(update_3.UserUpdateRouter);
app.use(delete_3.UserDeleteRouter);
app.use(create_3.MovieCreateRouter);
app.use(movie_1.MovieIndexRouter);
app.use(show_4.MovieShowRouter);
app.use(update_4.MovieUpdateRouter);
app.use(delete_4.MovieDeleteRouter);
app.use(create_4.SeriesCreateRouter);
app.use(series_1.SeriesIndexRouter);
app.use(show_5.SeriesShowRouter);
app.use(update_5.SeriesUpdateRouter);
app.use(delete_5.SeriesDeleteRouter);
app.use(create_5.SeasonCreateRouter);
app.use(season_1.SeasonIndexRouter);
app.use(show_6.SeasonShowRouter);
app.use(update_6.SeasonUpdateRouter);
app.use(delete_6.SeasonDeleteRouter);
app.use(create_6.EpisodeCreateRouter);
app.use(episode_1.EpisodeIndexRouter);
app.use(show_7.EpisodeShowRouter);
app.use(update_7.EpisodeUpdateRouter);
app.use(delete_7.EpisodeDeleteRouter);
app.use(create_7.SearchCreateRouter);
app.use(search_1.SearchIndexRouter);
app.use(show_8.SearchShowRouter);
app.use(delete_8.SearchDeleteRouter);
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
