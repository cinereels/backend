import express, { Request, Response, NextFunction } from 'express';
import { requireAdmin } from '../../middlewares/require-admin';
import { validateRequest } from '../../middlewares/validate-request';
import { Series } from '../../models/series';
import { SeriesValidator } from '../../validators/series';

const Router = express.Router();

Router.put('/api/series/:id', requireAdmin, SeriesValidator, validateRequest, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;

        const series = await Series.findById(id);

        if (!series) {
            throw new Error('Series not found!');
        }

        const { name, description, genre, seasons, gallery } = req.body;

        series.set({
            name,
            description,
            genre,
            seasons,
            gallery,
        });

        await series.save();

        res.status(204).send({
            message: 'Series Updated',
            series: series.populate('seasons').populate('gallery'),
        });
    } catch (err) {
        next(err);
    }
});

export { Router as SeriesUpdateRouter };