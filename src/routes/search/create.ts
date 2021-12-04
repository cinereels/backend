import express, { Request, Response, NextFunction } from 'express';
import { requireAuth } from '../../middlewares/require-auth';
import { Search } from '../../models/search';

const Router = express.Router();

Router.post('/api/search', requireAuth, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { text } = req.body;

        const search = Search.build({ text, user: req.currentUser?.id as string, });

        await search.save();

        res.status(201).send({
            message: 'Search Added',
            search,
        });
    } catch (err) {
        next(err);
    }
});

export { Router as SearchCreateRouter };