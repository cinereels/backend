import express, { Request, Response, NextFunction } from 'express';
import { Episode } from '../../models/episode';

const Router = express.Router();

Router.get('/api/episode', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const episodes = await Episode.find().populate('video').populate('gallery');

        res.status(200).send({
            message: 'Episodes Received',
            episodes,
        });
    } catch (err) {
        next(err);
    }
});

export { Router as EpisodeIndexRouter };