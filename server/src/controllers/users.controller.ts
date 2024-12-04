import chalk from "chalk";
import type { NextFunction, Request, Response } from "express";
import { ApiError, Provider } from "../utils/ApiError";
import { asyncHandler } from "../utils/AsyncHandler";
import { logger } from "../utils/logger";
import { ApiResponse } from "../utils/ApiResponse";
import { userService } from "../service/user-service";

interface RequestBody {
   name: string;
   email: string;
   password: string;
}

const signupUser = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
   const { name, email, password }: RequestBody = req.body;
   if (!name || !email || !password) {
      return next(new ApiError(Provider.VALIDATION, "name, email and password are required", 400));
   }

   try {
      const user = await userService.signin(req.body);
      if (!user.success) {
         return next(new ApiError(Provider.VALIDATION, "User already exists", 409));
      }
      logger.info(chalk.greenBright(`User ${name} signed up successfully`));
      res.status(201).json(new ApiResponse(201, "User signed up successfully", { name, email }));
   } catch (error) {
      next(new ApiError(Provider.PROTOCOL, "failed to signup user", 500, error));
   }
});

const loginUser = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
   try {
   } catch (error) {
      next(new ApiError(Provider.AUTHENTICATION, "failed to login user", 401, error));
   }
});

export { signupUser, loginUser };
