import express from "express";
import morgan from "morgan";
import cors from "cors";
// import cookieParser from "cookie-parser";
// import session from "express-session"; //! deprecated
// import passport from "passport";
// import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import {
  BASE_URL,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  NODE_ENV,
  SESSION_SECRET,
} from "./env";
import prisma from "./db";
import AppError from "./utils/appError";
import globalErrorHandler from "./controllers/errorHandler";
// import googleOauthProvider from "./controllers/passport/google";

//? Routes
import authRoute from "./routes/auth";
import UserRoute from "./routes/user";
// import { authorization } from "./middleware/authentication";
// import fs from "fs";
// import moment from "moment";

const app = express();

if (NODE_ENV === "development") {
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
// app.use(
//   session({
//     secret: SESSION_SECRET,
//     resave: true,
//     saveUninitialized: true,
//     cookie: {
//       secure: true,
//       httpOnly: true,
//     },
//   })
// );
// app.use(passport.initialize());
// app.use(passport.session());

// //? Note: This is a temporary fix for the session error
// app.use(function (req, res, next) {
//   if (!req.session) {
//     return next(new Error("Oh no")); //handle error
//   }
//   next(); //otherwise continue
// });

// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: GOOGLE_CLIENT_ID,
//       clientSecret: GOOGLE_CLIENT_SECRET,
//       callbackURL: `${BASE_URL}/auth/google/callback`,
//     },
//     googleOauthProvider
//   )
// );

// passport.serializeUser((user, done) => {
//   // Serialize the user data
//   done(null, user);
// });

// passport.deserializeUser<any>((user, done) => {
//   // Deserialize the user data
//   done(null, user);
// });

app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: `Welcome to the LinkSphere server <${NODE_ENV}>`,
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
app.use("/users", UserRoute);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

export default app;
