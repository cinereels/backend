import express, { Request, Response, NextFunction } from 'express';
import { Series } from '../../models/series';

const Router = express.Router();

Router.get('/api/series', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const query = req.query;

        const allSeries = await Series.find({ ...query })
            .populate({
                path: 'seasons',
                populate: {
                    path: 'episodes',
                    model: 'Episode',
                }
            }).populate('gallery');
        
        res.status(200).send({
            message: 'All Series Received',
            allSeries,
        });
    } catch (err) {
        next(err);
    }
});

export { Router as SeriesIndexRouter };