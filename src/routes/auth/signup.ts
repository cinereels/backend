import express, { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { User } from '../../models/user';
import { AuthValidator } from '../../validators/auth';
import { validateRequest } from '../../middlewares/validate-request';
import { createTransport, createTestAccount } from 'nodemailer';
import { Verifier } from '../../models/verifier';

const Router = express.Router();

const randomNum = (min: number, max: number) => {
	return Math.floor(Math.random() * (max - min)) + min;
}

Router.post('/api/auth/signup', AuthValidator, validateRequest, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password, verifierId, verificationCode } = req.body;

        const verifier = await Verifier.findById(verifierId);

        if (!verifier || (verifier.code !== verificationCode)) {
            throw new Error('Invalid verification code!');
        }
    
        const passwordHash = await bcrypt.hash(password, 12);

        const color = randomNum(0, 14);

        let isAdmin = false;

        // if (adminPassKey && adminPassKey === 'cinereelsapp247') {
        //     isAdmin = true;
        // }

        const user = User.build({
            email, password: passwordHash, color, isAdmin
        });
    
        await user.save();
    
        const token = jwt.sign({ email, id: user.id, isAdmin }, 'secret', {
            expiresIn: '24h',
        });
    
        const expiryDate = Math.round(new Date().getTime() / 1000) + 24 * 3600;

        res.status(201).send({
            message: 'User signed up successfully',
            token,
            id: user.id,
            expiryDate,
            isAdmin,
        });
    } catch (err) {
        next(err);
    }
});


Router.post('/api/auth/verify', AuthValidator, validateRequest, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email } = req.body;

        const existingUser = await User.findOne({ email });
    
        if (existingUser) {
            throw new Error("Email address already exists!");
        }

        // email verification
        const transporter = createTransport({
            service: 'Gmail',
            auth: {
                user: 'cinereelsapp@gmail.com',
                pass: 'startup247'
            }
        });

        const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

        const verifier = Verifier.build({
            code: verificationCode,
            email,
        });

        await verifier.save();

        await transporter.sendMail({
            from: 'cinereelsapp@gmail.com',
            to: email,
            subject: 'Email verification of your cinereels account',
            html: `
                <h4>This is an email verification mail sent for verifying your provided email address. Below provided is a 6 digit verification code for completing the sign-up process. Please enter the following verification code on the cinereels application.</h4>
                <h1>${verificationCode}</h1>
            `,
        });

        res.status(201).send({
            message: 'Verification code generated',
            verifierId: verifier.id,
        });
    } catch (err) {
        next(err);
    }
});

export { Router as SignupRouter };