import express from "express";
import { body } from "express-validator";
import { authorization } from "../middleware/auth";
import {
  getUser,
  updateUserProfile,
  uploadProfileImage,
} from "../controllers/user";
import { upload } from "../middleware/user";

const router = express.Router();

router.get("/me", authorization, getUser);
router.patch(
  "/me",
  authorization,
  [
    body("firstName").trim().notEmpty().withMessage("First name is required"),
    body("lastName").trim().notEmpty().withMessage("Last name is required"),
    body("phoneNumber")
      .isMobilePhone("any")
      .withMessage("Invalid phone number"),
  ],
  updateUserProfile
);
router.post(
  "/me/image",
  authorization,
  upload.single("image"),
  uploadProfileImage
);

export default router;
