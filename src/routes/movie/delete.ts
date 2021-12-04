import express, { Request, Response, NextFunction } from 'express';
import { requireAdmin } from '../../middlewares/require-admin';
import { Movie } from '../../models/movie';

const Router = express.Router();

Router.delete('/api/movie/:id', requireAdmin, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;

        const movie = await Movie.findById(id);

        if (!movie) {
            throw new Error('Movie not found!');
        }

        await Movie.findByIdAndDelete(id);

        res.status(202).send({
            message: 'Movie Deleted',
            movie,
        });
    } catch (err) {
        next(err);
    }
});

export { Router as MovieDeleteRouter };