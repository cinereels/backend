import express, { Request, Response, NextFunction } from 'express';
import { requireAdmin } from '../../middlewares/require-admin';
import { validateRequest } from '../../middlewares/validate-request';
import { Season } from '../../models/season';
import { SeasonValidator } from '../../validators/season';

const Router = express.Router();

Router.put('/api/season/:id', requireAdmin, SeasonValidator, validateRequest, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;

        const season = await Season.findById(id);

        if (!season) {
            throw new Error('Season not found!');
        }

        const { seasonNo, description, episodes, gallery } = req.body;

        season.set({
            seasonNo,
            description,
            episodes,
            gallery,
        });

        await season.save();
        
        res.status(204).send({
            message: 'Season Updated',
            season,
        });
    } catch (err) {
        throw err;
    }
});

export { Router as SeasonUpdateRouter };