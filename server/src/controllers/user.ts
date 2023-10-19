import type { Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import prisma from "../db";
import catchAsync from "../utils/catchAsync";
import { customErrorFormatter, exclude } from "../utils/helper";
import AppError from "../utils/appError";

const getUser = catchAsync(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req._currentUser) {
      return next(new AppError("User not found", 404));
    }

    const user = exclude(req._currentUser, ["password"]);

    res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  }
);

const updateUser = catchAsync(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const errors = validationResult(req).formatWith(customErrorFormatter);
    if (!errors.isEmpty()) {
      return next(new AppError("Invalid request data", 400, errors.array()));
    }

    const { firstName, lastName, phoneNumber } = req.body;

    try {
      const user = await prisma.userProfile.update({
        where: {
          userId: req._currentUser?.profile?.userId,
        },
        data: {
          firstName,
          lastName,
          phoneNumber,
        },
      });

      res.status(200).json({
        status: "success",
        data: {
          user,
        },
      });
    } catch (error) {
      return next(new AppError("User not found", 404));
    }
  }
);

export { getUser, updateUser };
