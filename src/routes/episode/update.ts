import express, { Request, Response, NextFunction } from 'express';
import { requireAdmin } from '../../middlewares/require-admin';
import { validateRequest } from '../../middlewares/validate-request';
import { Episode } from '../../models/episode';
import { Video } from '../../models/video';
import { EpisodeValidator } from '../../validators/episode';

const Router = express.Router();

Router.put('/api/episode/:id', requireAdmin, EpisodeValidator, validateRequest, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;

        const episode = await Episode.findById(id);

        if (!episode) {
            throw new Error('Episode not found!');
        }

        const video = await Video.findById(episode.video);

        if (!video) {
            throw new Error('Video not found!');
        }

        const { episodeNo, name, description, gallery, url, duration } = req.body;

        video.set({
            title: name,
            description,
            url,
            duration,
        });

        await video.save();

        episode.set({
            episodeNo,
            gallery,
            video: video.id,
        });

        episode.save();

        res.status(204).send({
            message: 'Episode Updated',
            episode,
        });
    } catch (err) {
        next(err);
    }
});

export { Router as EpisodeUpdateRouter };