import express, { Request, Response, NextFunction } from 'express';
import { Season } from '../../models/season';

const Router = express.Router();

Router.get('/api/season/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;

        const season = await Season.findById(id)

        if (!season) {
            throw new Error('Season not found!');
        }

        season.populate('episodes').populate('gallery');
        
        res.status(200).send({
            message: 'Season Received',
            season,
        });
    } catch (err) {
        throw err;
    }
});

export { Router as SeasonShowRouter };