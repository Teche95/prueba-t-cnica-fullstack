import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { SECRET_JWT_KEY } from '../config';

export const authRequired = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies.access_token;

        if (!token) {
            throw new Error();
        }

        const payload = jwt.verify(token, SECRET_JWT_KEY);
        req.body.userId = payload

        next();
    } catch (err) {
        res.status(401).send('Please authenticate');
    }
};