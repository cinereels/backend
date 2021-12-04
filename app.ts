import dotenv from 'dotenv';
dotenv.config();

import path from 'path';
import { json } from 'body-parser';
import express, { Request, Response, NextFunction } from 'express';
import multer, { FileFilterCallback } from 'multer';

import { ChannelIndexRouter } from './src/routes/channel';
import { ChannelCreateRouter } from './src/routes/channel/create';
import { ChannelShowRouter } from './src/routes/channel/show';
import { ChannelUpdateRouter } from './src/routes/channel/update';
import { ChannelDeleteRouter } from './src/routes/channel/delete';
import { GalleryIndexRouter } from './src/routes/gallery';
import { GalleryCreateRouter } from './src/routes/gallery/create';
import { GalleryShowRouter } from './src/routes/gallery/show';
import { GalleryDeleteRouter } from './src/routes/gallery/delete';
import { GalleryUpdateRouter } from './src/routes/gallery/update';
import { currentUser } from './src/middlewares/current-user';
import { LoginRouter } from './src/routes/auth/login';
import { SignupRouter } from './src/routes/auth/signup';
import { UserIndexRouter } from './src/routes/user';
import { UserShowRouter } from './src/routes/user/show';
import { UserUpdateRouter } from './src/routes/user/update';
import { UserDeleteRouter } from './src/routes/user/delete';
import { MovieCreateRouter } from './src/routes/movie/create';
import { MovieIndexRouter } from './src/routes/movie';
import { MovieShowRouter } from './src/routes/movie/show';
import { MovieUpdateRouter } from './src/routes/movie/update';
import { MovieDeleteRouter } from './src/routes/movie/delete';
import { SeriesCreateRouter } from './src/routes/series/create';
import { SeriesIndexRouter } from './src/routes/series';
import { SeriesShowRouter } from './src/routes/series/show';
import { SeriesUpdateRouter } from './src/routes/series/update';
import { SeriesDeleteRouter } from './src/routes/series/delete';
import { SeasonCreateRouter } from './src/routes/season/create';
import { SeasonIndexRouter } from './src/routes/season';
import { SeasonShowRouter } from './src/routes/season/show';
import { SeasonUpdateRouter } from './src/routes/season/update';
import { SeasonDeleteRouter } from './src/routes/season/delete';
import { EpisodeCreateRouter } from './src/routes/episode/create';
import { EpisodeShowRouter } from './src/routes/episode/show';
import { EpisodeIndexRouter } from './src/routes/episode';
import { EpisodeUpdateRouter } from './src/routes/episode/update';
import { EpisodeDeleteRouter } from './src/routes/episode/delete';
import { SearchCreateRouter } from './src/routes/search/create';
import { SearchIndexRouter } from './src/routes/search';
import { SearchShowRouter } from './src/routes/search/show';
import { SearchDeleteRouter } from './src/routes/search/delete';

const app = express();

const storage = multer.diskStorage({
    destination: (req: Request, file: Express.Multer.File, cb) => {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
            cb(null, 'images');
        } else if(file.mimetype === 'video/mp4' || file.mimetype === 'video/x-flv') {
            cb(null, 'videos');
        }
    },
    filename: (req: Request, file: Express.Multer.File, cb) => {
        cb(null, new Date().toISOString() + '-' + file.originalname);
    },
});

const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'video/mp4' || file.mimetype === 'video/x-flv') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

app.use(multer({storage: storage, fileFilter: fileFilter}).any());
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/videos', express.static(path.join(__dirname, 'videos')));

app.set('trust proxy', true);

app.use(json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use(currentUser);

app.use(ChannelIndexRouter);
app.use(ChannelCreateRouter);
app.use(ChannelShowRouter);
app.use(ChannelUpdateRouter);
app.use(ChannelDeleteRouter);
app.use(GalleryIndexRouter);
app.use(GalleryCreateRouter);
app.use(GalleryShowRouter);
app.use(GalleryUpdateRouter);
app.use(GalleryDeleteRouter);
app.use(LoginRouter);
app.use(SignupRouter);
app.use(UserIndexRouter);
app.use(UserShowRouter);
app.use(UserUpdateRouter);
app.use(UserDeleteRouter);
app.use(MovieCreateRouter);
app.use(MovieIndexRouter);
app.use(MovieShowRouter);
app.use(MovieUpdateRouter);
app.use(MovieDeleteRouter);
app.use(SeriesCreateRouter);
app.use(SeriesIndexRouter);
app.use(SeriesShowRouter);
app.use(SeriesUpdateRouter);
app.use(SeriesDeleteRouter);
app.use(SeasonCreateRouter);
app.use(SeasonIndexRouter);
app.use(SeasonShowRouter);
app.use(SeasonUpdateRouter);
app.use(SeasonDeleteRouter);
app.use(EpisodeCreateRouter);
app.use(EpisodeIndexRouter);
app.use(EpisodeShowRouter);
app.use(EpisodeUpdateRouter);
app.use(EpisodeDeleteRouter);
app.use(SearchCreateRouter);
app.use(SearchIndexRouter);
app.use(SearchShowRouter);
app.use(SearchDeleteRouter);

app.all('*', (req: Request, res: Response) => {
    console.log(req.path);
    throw new Error('API route not found!');
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
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

export { app };