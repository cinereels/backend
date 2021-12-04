import express, { Request, Response, NextFunction } from 'express';
import { Series } from '../../models/series';

const Router = express.Router();

Router.get('/api/series/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;

        const series = await Series.findById(id);

        if (!series) {
            throw new Error('Series not found!');
        }

        series.populate({
            path: 'seasons',
            populate: {
                path: 'episodes',
                model: 'Episode',
            }
        }).populate('gallery');
        
        res.status(200).send({
            message: 'Series Received',
            series,
        });
    } catch (err) {
        next(err);
    }
});

export { Router as SeriesShowRouter };