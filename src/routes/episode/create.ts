import express, { Request, Response, NextFunction } from 'express';
import { requireAdmin } from '../../middlewares/require-admin';
import { validateRequest } from '../../middlewares/validate-request';
import { Episode } from '../../models/episode';
import { Video } from '../../models/video';
import { EpisodeValidator } from '../../validators/episode';

const Router = express.Router();

Router.post('/api/episode', requireAdmin, EpisodeValidator, validateRequest, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { episodeNo, name, description, gallery, url, duration } = req.body;

        const video = Video.build({
            title: name,
            description,
            url,
            duration,
        });

        await video.save();

        const episode = Episode.build({
            episodeNo,
            gallery,
            video: video.id,
        });

        episode.save();

        res.status(201).send({
            message: 'Episode Added',
            episode: episode.populate('gallery').populate('video'),
        });
    } catch (err) {
        next(err);
    }
});

export { Router as EpisodeCreateRouter };