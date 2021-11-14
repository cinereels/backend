import express, { Request, Response, NextFunction } from 'express';
import { Channel } from '../../models/channel';
import { ChannelValidator } from '../../validators/channel';

const Router = express.Router();

Router.post('/api/channel', ChannelValidator, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, channelNum, galleryIds, showUrl, live } = req.body;

        const channel = Channel.build({
            name,
            channelNum,
            gallery: galleryIds,
            showUrl,
            live,
        });

        await channel.save();

        res.status(201).send({
            message: 'Channel created!',
            channel,
        });
    } catch (err) {
        next(err);
    }
});

export { Router as ChannelCreateRouter };