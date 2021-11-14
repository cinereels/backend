import express, { Request, Response, NextFunction } from 'express';
import { Channel } from '../../models/channel';

const Router = express.Router();

Router.get('/api/channel/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;

        const channel = await Channel.findById(id).populate('gallery');

        if (!channel) {
            throw new Error('Channel not found!');
        }

        res.status(200).send({
            message: 'Channel received!',
            channel,
        });
    } catch (err) {
        next(err);
    }
});

export { Router as ChannelShowRouter };