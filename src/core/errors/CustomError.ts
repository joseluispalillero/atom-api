import { StatusCodes } from "http-status-codes";

export class CustomError extends Error {
    error: {
        code: string;
        status: number;
        cause: string;
        message: string;
    };
    constructor(code: string, cause = '', status = StatusCodes.INTERNAL_SERVER_ERROR) {
        super(cause);
        this.error = {
            code,
            status,
            cause,
            message: cause,
        };
    }
}