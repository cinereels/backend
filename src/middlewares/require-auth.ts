import { Request, Response, NextFunction } from 'express';

const requireAuth = (req: Request, res: Response, next: NextFunction) => {
    if (!req.currentUser) {
        throw new Error("Not Authorized!");
    }
    next();
}

export { requireAuth };