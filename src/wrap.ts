import { Request, Response, NextFunction } from 'express';
// Custom async middleware that catches errors and passes them to the next middleware
const asyncMiddleware = (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) => {
    return (req: Request, res: Response, next: NextFunction) => {
        fn(req, res, next).catch(next); // Catch and pass errors to the next middleware
    };
};

export default asyncMiddleware;