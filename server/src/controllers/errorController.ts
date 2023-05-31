import AppError from "../utils/appError";
import { Response, Request, NextFunction } from "express";

// function handleCastingErrorDB(err) {
//   const message = `Invalid ${err.path}: ${err.value}`;
//   return new AppError(message, 400);
// }

// function handleDuplicateFieldDB(err) {
//   const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
//   const message = `Duplicate field value: ${value}. Please use another value`;
//   return new AppError(message, 400);
// }

// function handleValidationErrorDB(err) {
//   const errors = Object.values(err.errors).map((el) => el.message);
//   const message = `Invalid input data. ${errors.join(". ")}`;
//   return new AppError(message, 400);
// }

// function handleJWTError(err) {
//   return new AppError("Invalid Token", 401);
// }

// function handleJWTExpiredError(err) {
//   return new AppError("Token has expired", 401);
// }

function sendErrorDev(err: AppError, res: Response) {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: err,
    stack: err.stack,
  });
}

function sendErrorProd(err: AppError, res: Response) {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    //? Programming or other unknown error: don't leak error details
    console.error("ERROR: \n", err);
    res.status(500).json({
      status: "error",
      message: "Something went very wrong!",
    });
  }
}

function globalErrorHandler(
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === "production") {
    let error = structuredClone(err);

    // if (err instanceof mongoose.Error.CastError) {
    //   error = handleCastingErrorDB(err);
    // }
    // if (err.code === 11000) {
    //   error = handleDuplicateFieldDB(err);
    // }
    // if (err instanceof mongoose.Error.ValidationError) {
    //   error = handleValidationErrorDB(err);
    // }
    // if (err.name === "JsonWebTokenError") {
    //   error = handleJWTError(err);
    // }
    // if (err.name === "TokenExpiredError") {
    //   error = handleJWTExpiredError(err);
    // }
    sendErrorProd(error, res);
  }
}

export default globalErrorHandler;
