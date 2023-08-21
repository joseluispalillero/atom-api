import { NextFunction, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

// Validation middleware
export const validateTask = [
    body('title').isString().withMessage('El campo [title] es requerido y debe ser una cadena de texto.'),
    body('desc').isString().withMessage('El campo [desc] es requerido y debe ser una cadena de texto.'),
    body('status').isIn(['PENDIENTE', 'COMPLETO']).withMessage('El campo [status] es requerido y solo puede ser "PENDIENTE" o "COMPLETO".'),
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const errorMessages = errors.array().map((error) => ({ msg: error.msg }));
            return res.status(400).json({ errors: errorMessages });
        }
        next();
    }
];