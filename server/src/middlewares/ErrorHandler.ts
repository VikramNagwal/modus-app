import type { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/ApiError";
import { logger } from "../utils/logger";
import chalk from "chalk";

class ErrorHandler {
    static handle(err: Error, req: Request, res: Response, next: NextFunction) {
        console.log(chalk.redBright("got error"))
        
        const StatusCode = err instanceof ApiError ? err.statusCode : 500;
        const Message = err.message || "Internal server error";

        logger.error(chalk.bgRedBright(`[Error] ${Message}`, err));

        res.status(StatusCode)
            .json({
                success: false,
                message: Message,
                isOperational: err instanceof ApiError,
                statusCode: StatusCode,
                err: process.env.NODE_ENV === "development" ? err : {},
            })
    }
}

export { ErrorHandler }