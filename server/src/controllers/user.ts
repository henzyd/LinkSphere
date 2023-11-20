import type { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import type { User, UserProfile } from "@prisma/client";
import { rimraf } from "rimraf";
import prisma from "../db";
import catchAsync from "../utils/catchAsync";
import { customErrorFormatter, exclude } from "../utils/helper";
import AppError from "../utils/appError";
import cloudinary from "../utils/cloudinary";

const getUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    if (!req._currentUser) {
      return next(new AppError("User not found", 404));
    }

    const user = exclude(req._currentUser, ["password"]);

    res.status(200).json({
      status: "success",
      data: user,
    });
  }
);

const updateUserProfile = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req).formatWith(customErrorFormatter);
    if (!errors.isEmpty()) {
      return next(new AppError("Invalid request data", 400, errors.array()));
    }

    const { firstName, lastName, phoneNumber } = req.body;

    const currentUser: User & {
      profile: UserProfile | null;
    } = req._currentUser;

    try {
      const user = await prisma.userProfile.update({
        where: {
          userId: currentUser.profile?.userId,
        },
        data: {
          firstName,
          lastName,
          phoneNumber,
        },
      });

      res.status(200).json({
        status: "success",
        data: user,
      });
    } catch (error) {
      return next(new AppError("User not found", 404));
    }
  }
);

const uploadProfileImage = catchAsync(async (req, res, next) => {
  const processedFile = req.file;

  if (!processedFile) return next(new AppError("Missing file", 400));

  const cloudinaryResult = await cloudinary.uploader.upload(
    processedFile.path,
    {
      folder: "profiles",
      use_filename: true,
    }
  );

  await rimraf(`${processedFile.destination}`);

  res.status(200).json({
    status: "success",
    data: {
      url: cloudinaryResult.secure_url,
    },
  });
});

export { getUser, updateUserProfile, uploadProfileImage };
