import express, { Request, Response, NextFunction } from 'express';
import { Season } from '../../models/season';

const Router = express.Router();

Router.get('/api/season', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const seasons = await Season.find().populate('episodes').populate('gallery');
        
        res.status(200).send({
            message: 'Seasons Received',
            seasons,
        });
    } catch (err) {
        throw err;
    }
});

export { Router as SeasonIndexRouter };