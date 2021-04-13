import jwt from 'jsonwebtoken';
import config from '../config/config';
import logging from '../config/logging';
import { Request, Response, NextFunction } from 'express';

const NAMESPACE = 'Authorization';

const extractJWT = (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'is validating token');

    let token = req.headers.authorization?.split(' ')[1];

    if (token) {
        jwt.verify(token, config.server.token.secret, (error, decoded) => {
            if (error) {
                return res.status(404).json({
                    message: error,
                    error
                });
            } else {
                res.locals.jwt = decoded;
                next();
            }
        });
    } else {
        return res.status(401).json({
            message: 'this token is unauthorized'
        });
    }
};

export default extractJWT;
