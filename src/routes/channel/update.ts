import express, { Request, Response, NextFunction } from 'express';
import { Channel } from '../../models/channel';
import { ChannelValidator } from '../../validators/channel';

const Router = express.Router();

Router.put('/api/channel/:id', ChannelValidator, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;

        const channel = await Channel.findById(id);

        if (!channel) {
            throw new Error('Channel not found!');
        }

        const { name, channelNum, galleryIds, showUrl, live } = req.body;

        channel.set({
            name,
            channelNum,
            gallery: galleryIds,
            showUrl,
            live,
        });

        await channel.save();

        res.status(200).send({
            message: 'Channel updated!',
            channel,
        });
    } catch (err) {
        next(err);
    }
});

export { Router as ChannelUpdateRouter };