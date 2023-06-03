import express from "express";
import morgan from "morgan";
import AppError from "./utils/appError";
import globalErrorHandler from "./controllers/errorController";
import authRoute from "./routes/authRoute";
// import fs from "fs";
import cors from "cors";
import prisma from "./db";

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());
app.use(
  cors({
    origin: "*", //! Allow from anywhere, change this to the frontend URL
  })
); //? Use the cors middleware
app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: `Welcome to the LinkSphere server <${process.env.NODE_ENV}>`,
  });
});
//? Delete all users
// app.delete("/users", (req, res) => {
//   prisma.user.deleteMany().then(() => {
//     res.status(200).json({
//       status: "success",
//       message: "All users deleted",
//     });
//   });
// });
//?
// app.post("/test", (req, res) => {
//   console.log(req.body);

//   fs.writeFile("test.json", JSON.stringify(req.body), (err) => {
//     if (err) {
//       console.error(err);
//       return res.status(500).json({
//         status: "error",
//         message: "Failed to write the file",
//       });
//     }

//     res.status(200).json({
//       status: "success",
//       message: "File written successfully",
//     });
//   });
// });
app.use("/auth", authRoute);
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

export default app;
