import express, { Request, Response, NextFunction } from 'express';
import { Movie } from '../../models/movie';

const Router = express.Router();

Router.get('/api/movie', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const query = req.query;

        // /api/movie?genre=horror

        const movies = await Movie.find({ ...query }).populate('video').populate('gallery');

        res.status(200).send({
            message: 'Movies Received',
            movies,
        });
    } catch (err) {
        next(err);
    }
});

export { Router as MovieIndexRouter };