import express, { Request, Response, NextFunction } from 'express';
import { requireAuth } from '../../middlewares/require-auth';
import { Search } from '../../models/search';

const Router = express.Router();

Router.delete('/api/search/:id', requireAuth, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;

        const search = await Search.findById(id);

        if (!search) {
            throw new Error('Search not found!');
        }

        await search.deleteOne();

        res.status(202).send({
            message: 'Search Deleted',
            search,
        });
    } catch (err) {
        next(err);
    }
});

export { Router as SearchDeleteRouter };