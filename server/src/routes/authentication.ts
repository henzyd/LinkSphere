import express from "express";
import { body, query } from "express-validator";
import {
  login,
  signup,
  logout,
  refreshAccessToken,
  resetPassword,
  resetPasswordConfirm,
} from "../controllers/authentication";
import { authorization } from "../middleware/authentication";

const router = express.Router();

const emailVaidator = () =>
  body("email").trim().isEmail().withMessage("Invalid email address");

const passwordValidator = () =>
  body("password")
    .trim()
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long");

const refreshTokenValidator = () =>
  body("refreshToken")
    .trim()
    .notEmpty()
    .withMessage("Refresh token is required");

router.post(
  "/signup",
  [
    body("username").trim().notEmpty().withMessage("Username is required"),
    emailVaidator(),
    passwordValidator(),
  ],
  signup
);
router.post("/login", [emailVaidator(), passwordValidator()], login);
router.post("/logout", authorization, [refreshTokenValidator()], logout);
router.post("/refresh-token", [refreshTokenValidator()], refreshAccessToken);
router.post("/reset-password", [emailVaidator()], resetPassword);
router.post(
  "/reset-password-confirm",
  [
    query("token").trim().notEmpty().withMessage("Token is required"),
    query("id").trim().notEmpty().withMessage("Id is required"),
    body("newPassword")
      .trim()
      .isLength({ min: 8 })
      .withMessage("New Password must be at least 8 characters long"),
  ],
  resetPasswordConfirm
);

export default router;
