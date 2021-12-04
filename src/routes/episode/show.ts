import express, { Request, Response, NextFunction } from 'express';
import { Episode } from '../../models/episode';

const Router = express.Router();

Router.get('/api/episode/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;

        const episode = await Episode.findById(id);

        if (!episode) {
            throw new Error('Episode not found!');
        }

        episode.populate('video').populate('gallery');

        res.status(200).send({
            message: 'Episode Received',
            episode,
        });
    } catch (err) {
        next(err);
    }
});

export { Router as EpisodeShowRouter };