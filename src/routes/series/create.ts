import express, { Request, Response, NextFunction } from 'express';
import { requireAdmin } from '../../middlewares/require-admin';
import { validateRequest } from '../../middlewares/validate-request';
import { Notification } from '../../models/notification';
import { Series } from '../../models/series';
import { SeriesValidator } from '../../validators/series';

const Router = express.Router();

Router.post('/api/series', requireAdmin, SeriesValidator, validateRequest, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, description, genre, seasons, gallery } = req.body;

        const series = Series.build({
            name,
            description,
            genre,
            seasons,
            gallery,
        });

        await series.save();

        const notification = Notification.build({
            title: name + ' Released',
            description: `${name} is now avialable on the application to binge watch, go on and enjoy the TV show's new episodes right now`,
            gallery,
        });

        await notification.save();

        res.status(201).send({
            message: 'Series Added',
            series: series.populate('seaons').populate('gallery'),
        });
    } catch (err) {
        next(err);
    }
});

export { Router as SeriesCreateRouter };