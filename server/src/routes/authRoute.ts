import express from "express";
import { body } from "express-validator";
import { signup } from "../controllers/authController";

const router = express.Router();

const emailVaidator = () =>
  body("email").trim().isEmail().withMessage("Invalid email address");

const passwordValidator = () =>
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long");

router.post(
  "/signup",
  [
    body("name").trim().notEmpty().withMessage("Name is required"),
    emailVaidator(),
    passwordValidator(),
  ],
  signup
);

export default router;
