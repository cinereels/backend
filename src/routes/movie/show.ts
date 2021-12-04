import express, { Request, Response, NextFunction } from 'express';
import { Movie } from '../../models/movie';

const Router = express.Router();

Router.get('/api/movie/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;

        const movie = await Movie.findById(id);

        if (!movie) {
            throw new Error('Movie not found!');
        }

        movie.populate('video').populate('gallery');

        res.status(200).send({
            message: 'Movie Received',
            movie,
        });
    } catch (err) {
        next(err);
    }
});

export { Router as MovieShowRouter };