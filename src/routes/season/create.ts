import express, { Request, Response, NextFunction } from 'express';
import { requireAdmin } from '../../middlewares/require-admin';
import { validateRequest } from '../../middlewares/validate-request';
import { Season } from '../../models/season';
import { SeasonValidator } from '../../validators/season';

const Router = express.Router();

Router.post('/api/season', requireAdmin, SeasonValidator, validateRequest, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { seasonNo, description, episodes } = req.body;

        const season = Season.build({
            seasonNo,
            description,
            episodes,
        });

        await season.save();
        
        res.status(201).send({
            message: 'Season Added',
            season: season.populate('episodes'),
        });
    } catch (err) {
        throw err;
    }
});

export { Router as SeasonCreateRouter };