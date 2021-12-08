import express, { Request, Response, NextFunction } from 'express';
import { requireAdmin } from '../../middlewares/require-admin';
import { validateRequest } from '../../middlewares/validate-request';
import { Movie } from '../../models/movie';
import { Notification } from '../../models/notification';
import { Video } from '../../models/video';
import { MovieValidator } from '../../validators/movie';

const Router = express.Router();

Router.post('/api/movie', requireAdmin, MovieValidator, validateRequest, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, description, gallery, url, genre, duration, imdb, rt } = req.body;
        
        const video = Video.build({
            title: name,
            description,
            url,
            duration,
        });

        await video.save();

        const movie = Movie.build({
            name,
            description,
            gallery,
            genre,
            video: video.id,
            imdb,
            rt,
        });

        await movie.save();

        const notification = Notification.build({
            title: name + ' Released',
            description: `${name} is now avialable on the application to binge watch, go on and enjoy the movie`,
            gallery,
        });

        await notification.save();

        res.status(201).send({
            message: 'Movie Added',
            movie,
            notification,
        });
    } catch (err) {
        next(err);
    }
});

export { Router as MovieCreateRouter };