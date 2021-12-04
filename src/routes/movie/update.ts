import express, { Request, Response, NextFunction } from 'express';
import { requireAdmin } from '../../middlewares/require-admin';
import { validateRequest } from '../../middlewares/validate-request';
import { Movie } from '../../models/movie';
import { Video } from '../../models/video';
import { MovieValidator } from '../../validators/movie';

const Router = express.Router();

Router.put('/api/movie/:id', requireAdmin, MovieValidator, validateRequest, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;

        const movie = await Movie.findById(id);

        if (!movie) {
            throw new Error('Movie not found!');
        }

        const video = await Video.findById(movie.video);

        if (!video) {
            throw new Error('Video not found!');
        }

        const { name, description, gallery, url, genre, duration } = req.body;
        
        video.set({
            title: name,
            description,
            url,
            duration,
        });

        await video.save();


        movie.set({
            name,
            description,
            gallery,
            genre,
            video: video.id,
        });

        await movie.save();

        res.status(201).send({
            message: 'Movie Updated',
            movie,
        });
    } catch (err) {
        next(err);
    }
});

export { Router as MovieUpdateRouter };