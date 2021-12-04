import express, { Request, Response, NextFunction } from 'express';
import { requireAdmin } from '../../middlewares/require-admin';
import { Season } from '../../models/season';

const Router = express.Router();

Router.delete('/api/season/:id', requireAdmin, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;

        const season = await Season.findById(id);

        if (!season) {
            throw new Error('Season not found!');
        }

        await season.deleteOne();
        
        res.status(202).send({
            message: 'Season Deleted',
            season,
        });
    } catch (err) {
        throw err;
    }
});

export { Router as SeasonDeleteRouter };