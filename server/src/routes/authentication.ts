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
  getGoogleAuthUrl,
  googleSignup,
} from "../controllers/authentication";
import { authorization } from "../middleware/authentication";
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
router.post(
  "/getGoogleAuthUrl",
  [
    body("authType")
      .trim()
      .notEmpty()
      .isIn(["signup", "login"])
      .withMessage("Invalid authType. Only signup and login are allowed"),
  ],
  getGoogleAuthUrl
);
router.post(
  "/googleSignup",
  [
    body("code")
      .isString()
      .withMessage("Code must be a string")
      .trim()
      .notEmpty()
      .withMessage("Code is required"),
  ],
  googleSignup
);
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
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email", "openid"] })
);
router.get(
  "/google/callback",
  // async (req: Request, res: Response, next: NextFunction) => {
  //   console.log("In google callback before \n", req.user);

  //   const accessToken = signAccessToken("123");
  //   const refreshToken = signRefreshToken("123");

  //   res.cookie("refreshToken", refreshToken, {
  //     httpOnly: true,
  //     secure: process.env.NODE_ENV === "production",
  //     // sameSite: "none",
  //   });

  //   res.cookie("accessToken", accessToken, {
  //     httpOnly: true,
  //     secure: process.env.NODE_ENV === "production",
  //     // sameSite: "none",
  //   });
  //   next();
  // },
  passport.authenticate("google", {
    failureRedirect: `/auth/google/faliure`,
    // successRedirect: `${process.env.CLIENT_BASE_URL}`,
    // successReturnToOrRedirect: `${process.env.CLIENT_BASE_URL}`,
  }),
  (req: Request, res: Response) => {
    console.log("In google callback \n", req.user);
    // res.cookie("accessToken", (req.user as { id: string })?.id, {
    //   httpOnly: true,
    //   secure: true,
    //   sameSite: "none",
    // });

    // res.cookie("accessToken", "123");
    res.cookie("authToken", "your-auth-token", {
      // maxAge: 604800000,
      expires: new Date(Date.now() + 604800000), // 7 days
      // domain: "",
      // secure: true,
      httpOnly: true,
    });

    //accounts.google.com/o/oauth2/v2/auth/oauthchooseaccount?response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A5000%2Fauth%2Fgoogle%2Fcallback&scope=profile%20email%20openid&client_id=777565418314-hr8lif0d5d4jtesn8f7s7vk74dnsbrof.apps.googleusercontent.com&service=lso&o2v=2&theme=glif&flowName=GeneralOAuthFlow
    res.redirect(`${process.env.CLIENT_BASE_URL}`);
    // https: res.redirect(`http://127.0.0.1:5173/dashboard`);
    // res.json({ message: "In google callback" });
  }
);
router.get("/google/faliure", (req: Request, res: Response) => {
  res.json({ message: "Google authentication failed" });
});

export default router;
