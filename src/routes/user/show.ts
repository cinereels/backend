import express, { Request, Response, NextFunction } from 'express';
import { requireAdmin } from '../../middlewares/require-admin';
import { requireAuth } from '../../middlewares/require-auth';
import { User } from '../../models/user';

const Router = express.Router();

Router.get('/api/user/:id', requireAdmin, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;

        const user = await User.findById(id);

        res.status(200).send({
            message: 'User Received',
            user,
        });
    } catch (err) {
        next(err);
    }
});

Router.get('/api/current-user', requireAuth, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.currentUser?.id;

        const currentUser = await User.findById(id);

        if (!currentUser) {
            throw new Error('Current user not found!');
        }

        res.status(200).send({
            message: 'Current User Received',
            currentUser,
        });
    } catch (err) {
        next(err);
    }
});

export { Router as UserShowRouter };