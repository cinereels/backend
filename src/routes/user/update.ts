import express, { Request, Response, NextFunction } from 'express';
import { requireAuth } from '../../middlewares/require-auth';
import { validateRequest } from '../../middlewares/validate-request';
import { User } from '../../models/user';
import { AuthValidator } from '../../validators/auth';

const Router = express.Router();

Router.put('/api/user/:id', requireAuth, AuthValidator, validateRequest, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;

        const { email, password, color } = req.body;

        const user = await User.findById(id);

        if (!user) {
            throw new Error('User not found!');
        }

        user.set({
            email, password, color,
        });

        await user.save();

        res.status(200).send({
            message: 'User Updated',
            user,
        });
    } catch (err) {
        next(err);
    }
});

export { Router as UserUpdateRouter };