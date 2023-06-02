import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import catchAsync from "../utils/catchAsync";
import { customErrorFormatter } from "../utils/helper";
import prisma from "../db";
import AppError from "../utils/appError";

const signup = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req).formatWith(customErrorFormatter);
    if (!errors.isEmpty()) {
      return next(new AppError("Invalid input data", 400, errors.array()));
    }

    const { name, email, password } = req.body;
    console.log(name, email, password);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    });
    console.log(user);

    res.status(201).json({
      status: "success",
      message: "User Signedup successfully",
    });
  }
);

export { signup };
