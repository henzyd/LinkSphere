import express from "express";
import { body } from "express-validator";
import { authorization } from "../middleware/auth";
import { getUser } from "../controllers/user";

const router = express.Router();

router.get("/me", authorization, getUser);

export default router;
