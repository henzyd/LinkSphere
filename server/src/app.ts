import express from "express";
import morgan from "morgan";
import cors from "cors";
// import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import AppError from "./utils/appError";
import globalErrorHandler from "./controllers/errorHandler";
import { googleOauthProvider } from "./controllers/authentication";
import authRoute from "./routes/authentication";
import prisma from "./db";
// import { authorization } from "./middleware/authentication";
// import fs from "fs";

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(
  cors({
    origin: "*", //! Allow from anywhere, change this to the frontend URL
  })
); //? Use the cors middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
    cookie: {
      secure: true,
      httpOnly: true,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      callbackURL: `${process.env.BASE_URL}/auth/google/callback`,
    },
    googleOauthProvider
  )
);

passport.serializeUser((user, done) => {
  // Serialize the user data
  done(null, user);
});

passport.deserializeUser<any>((user, done) => {
  // Deserialize the user data
  done(null, user);
});

app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: `Welcome to the LinkSphere server <${process.env.NODE_ENV}>`,
  });
});

//? Delete all users
app.delete("/users", (req, res) => {
  prisma.user.deleteMany().then(() => {
    res.status(200).json({
      status: "success",
      message: "All users deleted",
    });
  });
});
//?

app.use("/auth", authRoute);
app.get("/test", async (req, res, next) => {
  console.log("In test route");

  res.cookie("token", "1q2w3e4r5t1q2w3e4r5t", {
    maxAge: 604800000, // 7 days
    httpOnly: true,
  });
  res.status(200).json({
    status: "success",
    message: "All users deleted",
  });
});

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

export default app;
