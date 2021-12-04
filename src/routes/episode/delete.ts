import express, { Request, Response, NextFunction } from 'express';
import { requireAdmin } from '../../middlewares/require-admin';
import { Episode } from '../../models/episode';

const Router = express.Router();

Router.delete('/api/episode/:id', requireAdmin, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;

        const episode = await Episode.findById(id);

        if (!episode) {
            throw new Error('Episode not found!');
        }

        await episode.deleteOne();

        res.status(200).send({
            message: 'Episode Deleted',
            episode,
        });
    } catch (err) {
        next(err);
    }
});

export { Router as EpisodeDeleteRouter };