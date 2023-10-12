import express, { NextFunction, Request, Response } from "express";
import { body, query } from "express-validator";
import passport from "passport";
import {
  login,
  signup,
  logout,
  refreshAccessToken,
  resetPassword,
  resetPasswordConfirm,
  // getGoogleAuthUrl,
  // googleSignup,
} from "../controllers/auth";
import { authorization } from "../middleware/auth";
import { signAccessToken, signRefreshToken } from "../utils/jwt";

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
// router.post(
//   "/getGoogleAuthUrl",
//   [
//     body("authType")
//       .trim()
//       .notEmpty()
//       .isIn(["signup", "login"])
//       .withMessage("Invalid authType. Only signup and login are allowed"),
//   ],
//   getGoogleAuthUrl
// );
// router.post(
//   "/googleSignup",
//   [
//     body("code")
//       .isString()
//       .withMessage("Code must be a string")
//       .trim()
//       .notEmpty()
//       .withMessage("Code is required"),
//   ],
//   googleSignup
// );
router.post("/logout", authorization, [refreshTokenValidator()], logout);
router.post("/refresh-token", [refreshTokenValidator()], refreshAccessToken);
router.post("/reset-password", [emailVaidator()], resetPassword);
router.post(
  "/reset-password-confirm",
  [
    body("userId").trim().notEmpty().withMessage("User id is required"),
    body("token").trim().notEmpty().withMessage("Token is required"),
    body("newPassword")
      .trim()
      .isLength({ min: 8 })
      .withMessage("New Password must be at least 8 characters long"),
  ],
  resetPasswordConfirm
);
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: `/auth/google/faliure`,
  }),
  (req: Request, res: Response) => {
    console.log("In google callback \n", req.user);

    res.send(req.user);
    // res.redirect(`${req.protocol}://${req.hostname}/?token=${req.user}`);
  }
);
router.get("/google/faliure", (req: Request, res: Response) => {
  res.json({ message: "Google authentication failed" });
});

export default router;
