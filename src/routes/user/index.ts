import express, { Request, Response, NextFunction } from 'express';
import { requireAdmin } from '../../middlewares/require-admin';
import { User } from '../../models/user';

const Router = express.Router();

Router.get('/api/user', requireAdmin, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await User.find();

        res.status(200).send({
            message: 'Users Received',
            users,
        });
    } catch (err) {
        next(err);
    }
});

export { Router as UserIndexRouter };