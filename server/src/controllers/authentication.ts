import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import { JwtPayload, verify as JwtVerify } from "jsonwebtoken";
import crypto from "crypto";
import catchAsync from "../utils/catchAsync";
import { customErrorFormatter, hashPasswordHandler } from "../utils/helper";
import prisma from "../db";
import AppError from "../utils/appError";
import { signAccessToken, signRefreshToken } from "../utils/jwt";
import { sendWelcomeMail } from "../utils/email";

const signup = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req).formatWith(customErrorFormatter);
    if (!errors.isEmpty()) {
      return next(new AppError("Invalid request data", 400, errors.array()));
    }

    const { username, email, password } = req.body;

    const hashedPassword = await hashPasswordHandler(password);

    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    try {
      await sendWelcomeMail(email, {
        name: user.username,
        email: user.email,
      });
    } catch (error) {
      console.log(error);
      return next(new AppError("Failed to send email", 500));
    }

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
      return next(new AppError("Invalid request data", 400, errors.array()));
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
      return next(new AppError("Invalid request data", 400, errors.array()));
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

const refreshAccessToken = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req).formatWith(customErrorFormatter);
    if (!errors.isEmpty()) {
      return next(new AppError("Invalid request data", 400, errors.array()));
    }

    const { refreshToken } = req.body;

    let decoded: JwtPayload | string;
    try {
      decoded = JwtVerify(refreshToken, process.env.JWT_SECRET);
    } catch (error) {
      return next(new AppError("Invalid token", 400));
    }

    // Check if the token is blacklisted
    const blacklistedToken = await prisma.blacklistedToken.findUnique({
      where: {
        token: refreshToken,
      },
    });
    if (blacklistedToken) {
      return next(new AppError("Not authorized", 401));
    }

    const { userId } = decoded as { userId: string; iat: number; exp: number };

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return next(new AppError("Invalid token", 400));
    }

    const accessToken = signAccessToken(user.id);

    res.status(200).json({
      status: "success",
      message: "Access token refreshed successfully",
      data: {
        accessToken,
      },
    });
  }
);

const resetPassword = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req).formatWith(customErrorFormatter);
    if (!errors.isEmpty()) {
      return next(new AppError("Invalid request data", 400, errors.array()));
    }

    const { email } = req.body;

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return next(new AppError("User does not exist", 404));
    }

    //? Generate a reset token and send it to the user's email
    const token = crypto.randomBytes(32).toString("hex");
    console.log(token, "token");

    const TOKEN_EXPIRATION = 24 * 60 * 60 * 1000; // 24 hours
    console.log(TOKEN_EXPIRATION, "TOKEN_EXPIRATION");

    const tokenExpiration = Date.now() + TOKEN_EXPIRATION;
    console.log(tokenExpiration, "tokenExpiration");

    const resetPasswordToken = await prisma.resetPasswordToken.create({
      data: {
        token,
        expiresAt: new Date(tokenExpiration),
        user: {
          connect: {
            id: user.id,
          },
        },
      },
    });
    console.log(resetPasswordToken, "resetPasswordToken");

    const resetPasswordUrl = `${req.protocol}://${req.get(
      "host"
    )}/auth/reset-password-confirm?token=${resetPasswordToken.token}&id=${
      user.id
    }`;
    console.log(resetPasswordUrl, "resetPasswordUrl");

    //? Send the reset token to the user's email

    res.status(200).json({
      status: "success",
      message: "Reset token sent successfully",
    });
  }
);

const resetPasswordConfirm = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req).formatWith(customErrorFormatter);
    if (!errors.isEmpty()) {
      return next(new AppError("Invalid request data", 400, errors.array()));
    }

    const { token, id } = JSON.parse(JSON.stringify(req.query));
    const { newPassword } = req.body;

    const resetPasswordToken = await prisma.resetPasswordToken.findUnique({
      where: {
        token,
      },
      include: {
        user: true,
      },
    });

    if (!resetPasswordToken) {
      return next(new AppError("Invalid token", 400));
    }

    if (resetPasswordToken.expiresAt < new Date()) {
      return next(new AppError("Token expired", 400));
    }

    const hashedPassword = await hashPasswordHandler(newPassword);

    try {
      await prisma.user.update({
        where: {
          id,
        },
        data: {
          password: hashedPassword,
        },
      });
    } catch (error) {
      return next(new AppError("Invalid id", 400));
    }

    await prisma.resetPasswordToken.delete({
      where: {
        id: resetPasswordToken.id,
      },
    });

    res.status(200).json({
      status: "success",
      message: "Password reset successfully",
    });
  }
);

export {
  signup,
  login,
  logout,
  refreshAccessToken,
  resetPassword,
  resetPasswordConfirm,
};
