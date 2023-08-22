import { NextFunction, Request, Response } from 'express';
import logger from '../loggers/Logger';

// error handling
export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    logger.error(`ERROR HANDLER ::: ${err.message}`);
    if (err.error) {
        res.status(err.error.status || 500).json({ ...err });
    } else if (err.status) {
        res.status(err.status).send({
            error: {
                status: err.status,
                code: err.code,
                message: err.message || err.cod,
            },
        });
    } else {
        res.status(500).send({
            error: {
                status: 500,
                code: err.code,
                message: err.message,
            },
        });
    }
};