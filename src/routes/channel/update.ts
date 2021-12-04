import express, { Request, Response, NextFunction } from 'express';
import { Channel } from '../../models/channel';
import { Video } from '../../models/video';
import { ChannelValidator } from '../../validators/channel';

const Router = express.Router();

Router.put('/api/channel/:id', ChannelValidator, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;

        const channel = await Channel.findById(id);

        if (!channel) {
            throw new Error('Channel not found!');
        }

        const video = await Video.findById(channel.video);

        if (!video) {
            throw new Error('Video not found!');
        }

        const { name, channelNo, description, gallery, url, live, genre } = req.body;

        video.set({
            title: name,
            url,
            description,
            duration: '',
        });

        await video.save();

        channel.set({
            channelNo,
            name,
            gallery,
            genre,
            live,
            video: video.id,
        });

        await channel.save();

        res.status(200).send({
            message: 'Channel Updated',
            channel,
        });
    } catch (err) {
        next(err);
    }
});

export { Router as ChannelUpdateRouter };