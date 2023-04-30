import mongoose from "mongoose";

if (process.env.NODE_ENV === "development") {
  mongoose
    .connect(process.env.LOCAL_DATABASE_CONNECTION_STRING)
    .then(() => {
      console.log("connection established at " + process.env.NODE_ENV);
    })
    .catch((err) => {
      console.log("connection failed at " + process.env.NODE_ENV);
      console.log(err);
    });
} else if (process.env.NODE_ENV === "production") {
  mongoose
    .connect(
      process.env.PRODUCTION_DATABASE_CONNECTION_STRING.replace(
        "<password>",
        process.env.PRODUCTION_DB_PASSWORD
      )
    )
    .then(() => {
      console.log("connection established at " + process.env.NODE_ENV);
    })
    .catch((err) => {
      console.log("connection failed at " + process.env.NODE_ENV);
      console.log(err);
    });
}
