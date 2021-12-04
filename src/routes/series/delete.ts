import express, { Request, Response, NextFunction } from 'express';
import { requireAdmin } from '../../middlewares/require-admin';
import { Series } from '../../models/series';

const Router = express.Router();

Router.delete('/api/series/:id', requireAdmin, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;

        const series = await Series.findById(id);

        if (!series) {
            throw new Error('Series not found!');
        }

        await series.deleteOne();

        res.status(202).send({
            message: 'Series Deleted',
            series,
        });
    } catch (err) {
        next(err);
    }
});

export { Router as SeriesDeleteRouter };