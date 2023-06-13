import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import { verify as JwtVerify } from "jsonwebtoken";
import catchAsync from "../utils/catchAsync";
import { customErrorFormatter } from "../utils/helper";
import prisma from "../db";
import AppError from "../utils/appError";
import { signAccessToken, signRefreshToken } from "../utils/jwt";

const signup = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req).formatWith(customErrorFormatter);
    if (!errors.isEmpty()) {
      return next(new AppError("Invalid request data", 400, errors.array()));
    }

    const { username, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 12);

    await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    res.status(200).json({
      status: "success",
      message: "User signedup successfully",
    });
  }
);

const login = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req).formatWith(customErrorFormatter);
    if (!errors.isEmpty()) {
      return next(new AppError("Invalid credentials", 400, errors.array()));
    }

    const { email, password } = req.body;

    //? Check if user exists
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
        username: true,
        email: true,
        password: true,
      },
    });
    if (!user) {
      return next(new AppError("User does not exist", 404));
    }

    //? Check if password is correct
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return next(new AppError("Invalid credentials", 400));
    }

    //? Update the lastLogin field of the user to the current date
    const updatedUser = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        lastLogin: new Date(),
      },
      select: {
        id: true,
        username: true,
        email: true,
      },
    });

    const accessToken = signAccessToken(user.id);
    const refreshToken = signRefreshToken(user.id);

    res.status(200).json({
      status: "success",
      message: "User logged in successfully",
      data: {
        ...updatedUser,
        accessToken,
        refreshToken,
      },
    });
  }
);

const logout = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req).formatWith(customErrorFormatter);
    if (!errors.isEmpty()) {
      return next(new AppError("Invalid credentials", 400, errors.array()));
    }
    const { refreshToken } = req.body;

    try {
      JwtVerify(refreshToken, process.env.JWT_SECRET);
    } catch (error) {
      return next(new AppError("Invalid token", 400));
    }

    await prisma.blacklistedToken.create({
      data: {
        token: refreshToken,
      },
    });
    res.status(200).json({
      status: "success",
      message: "User logged out successfully",
    });
  }
);

export { signup, login, logout };
