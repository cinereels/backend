import express, { Request, Response, NextFunction } from 'express';
import { Search } from '../../models/search';

const Router = express.Router();

Router.get('/api/search', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const query = req.query;
        
        // /api/search?user=6gqhe10293fhqofiew

        const searches = await Search.find({ ...query }).sort({ createdAt: -1 });

        res.status(200).send({
            message: 'Searches Received',
            searches,
        });
    } catch (err) {
        next(err);
    }
});

export { Router as SearchIndexRouter };