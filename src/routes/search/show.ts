import express, { Request, Response, NextFunction } from 'express';
import { Search } from '../../models/search';

const Router = express.Router();

Router.get('/api/search/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;

        const search = await Search.findById(id);

        if (!search) {
            throw new Error('Search not found!');
        }

        res.status(200).send({
            message: 'Search Received',
            search,
        });
    } catch (err) {
        next(err);
    }
});

export { Router as SearchShowRouter };