import express from "express";
import { body } from "express-validator";
import { authorization } from "../middleware/auth";
import { getUser, updateUserProfile } from "../controllers/user";

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

export default router;
