import express, { Request, Response, NextFunction } from 'express';
import { requireAdmin } from '../../middlewares/require-admin';
import { validateRequest } from '../../middlewares/validate-request';
import { Channel } from '../../models/channel';
import { Video } from '../../models/video';
import { ChannelValidator } from '../../validators/channel';

const Router = express.Router();

Router.post('/api/channel', requireAdmin, ChannelValidator, validateRequest, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, channelNo, description, gallery, url, live, genre } = req.body;

        const video = Video.build({
            title: name,
            url,
            description,
            duration: '00:00',
        });

        await video.save();

        const channel = Channel.build({
            channelNo,
            name,
            gallery,
            genre,
            live,
            video: video.id,
        });

        await channel.save();

        res.status(201).send({
            message: 'Channel Added',
            channel,
        });
    } catch (err) {
        next(err);
    }
});

export { Router as ChannelCreateRouter };