// utils/errorHandler.ts
import { NextFunction, Request, Response } from 'express';
import { BadreqError, ConflictError, NotFoundError, UnauthorizedError } from './errors';
import { logger } from '../config/loggerConfig';


export const handleError = (err: unknown, next: NextFunction) => {
    if (err instanceof BadreqError || err instanceof ConflictError || err instanceof NotFoundError || err instanceof UnauthorizedError) {
        return next(err);
    }
    const error = err as Error;
    logger.error(`Unhandled Error: ${error.message}`);
    return next(error);
};
