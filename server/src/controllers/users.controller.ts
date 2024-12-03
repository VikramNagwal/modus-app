import chalk from "chalk";
import type { NextFunction, Request, Response } from "express";
import { ApiError, Provider } from "../utils/ApiError";
import { asyncHandler } from "../utils/AsyncHandler";
import { SanatizeData } from "../utils/SanatizeData";
import { logger } from '../utils/logger';
import { usersTable } from "../db/schema";
import { db } from "../db";
import { ApiResponse } from "../utils/ApiResponse";


interface RequestBody {
    name: string;
    email: string;
    password: string;
}

const signupUser = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {name, email, password}: RequestBody = req.body;
        const processedData = new SanatizeData(name, password, email)
        const sanatizedUser = {
            name: processedData.lowerCase(),
            email: processedData.lowerCase(),
            password: await processedData.hashPassword()
        } 
const user: typeof usersTable.$inferInsert = {
    name: sanatizedUser.name,
    email: sanatizedUser.email,
    password: sanatizedUser.password
  };
        await db.insert(usersTable).values(user)
        logger.info(chalk.greenBright(`User ${name} signed up successfully`));
        res.status(201).json(new ApiResponse(201, "User signed up successfully", {name, email}));
    } catch (error) {
        next(new ApiError(Provider.PROTOCOL, "failed to signup user", 500, error));
    }
})

const loginUser = asyncHandler( async (req: Request, res: Response, next: NextFunction) => {
    try {
        
    } catch (error) {
       next(new ApiError(Provider.AUTHENTICATION, "failed to login user", 401, error));
    }
})

export {
    signupUser,
    loginUser
}