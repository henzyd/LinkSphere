import { Request, Response, NextFunction } from "express";
import { verify as JwtVerify, JwtPayload } from "jsonwebtoken";
import catchAsync from "../utils/catchAsync";
import AppError from "../utils/appError";
import prisma from "../db";
import { User } from "@prisma/client";

/**
 * Custom interface to include the _currentUser property in the Request object.
 * Extends the base Request interface from Express.
 */
interface AuthenticatedRequest extends Request {
  _currentUser?: User;
}

/**
 * Authorization middleware function to authenticate and authorize requests.
 * Checks the presence and validity of a JWT token, verifies if it's blacklisted,
 * decodes the token, and retrieves the associated user from the database.
 * If successful, assigns the user to the _currentUser property in the request object.
 *
 * @param {AuthenticatedRequest} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @param {NextFunction} next - The Express next function.
 * @returns {Promise<void>} - Promise that resolves when the middleware finishes execution.
 */
const authorization = catchAsync(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    console.log(authHeader, "authHeader");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return next(new AppError("Not authorized", 401));
    }

    const token = authHeader.split(" ")[1];
    console.log(token, "token");

    if (!token) {
      return next(new AppError("Not authorized", 401));
    }

    // Check if the token is blacklisted
    const blacklistedToken = await prisma.blacklistedToken.findUnique({
      where: {
        token,
      },
    });
    console.log(blacklistedToken, "blacklistedToken");
    if (blacklistedToken) {
      return next(new AppError("Not authorized", 401));
    }

    let decoded: JwtPayload | string;
    try {
      decoded = JwtVerify(token, process.env.JWT_SECRET);
      console.log(decoded, "decoded");
    } catch (error) {
      console.log(error, "error");
      return next(new AppError("Invalid token", 400));
    }

    const { userId } = decoded as { userId: string; iat: number; exp: number };

    // Retrieve the user from the database using the userId from the token
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    console.log(user, "user");

    if (!user) {
      return next(new AppError("Invalid token", 401));
    }

    // Assign the user to the _currentUser property in the request object
    req._currentUser = user;

    next();
  }
);

export { authorization };
