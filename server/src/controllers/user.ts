import type { Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import prisma from "../db";
import catchAsync from "../utils/catchAsync";
import { exclude } from "../utils/helper";

const getUser = catchAsync(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const user = exclude(req._currentUser as Record<string, any>, ["password"]);

    res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  }
);

export { getUser };
