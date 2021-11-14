import express, { Request, Response, NextFunction } from 'express';
import { Channel } from '../../models/channel';

const Router = express.Router();

Router.get('/api/channel', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const channels = await Channel.find().populate('gallery');

        res.status(200).send({
            message: 'Channel received!',
            channels,
        });
    } catch (err) {
        next(err);
    }
});

export { Router as ChannelIndexRouter };