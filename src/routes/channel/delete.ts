import express, { Request, Response, NextFunction } from 'express';
import { Channel } from '../../models/channel';

const Router = express.Router();

Router.delete('/api/channel/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;

        const channel = await Channel.findById(id);

        if (!channel) {
            throw new Error('Channel not found!');
        }

        await Channel.findByIdAndDelete(id);

        res.status(202).send({
            message: 'Channel deleted!',
            channel,
        });
    } catch (err) {
        next(err);
    }
});

export { Router as ChannelDeleteRouter };