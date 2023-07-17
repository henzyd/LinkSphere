import dotenv from "dotenv";
dotenv.config({ path: `.env.${process.env.NODE_ENV || "development"}` });
import "./db";
import app from "./app";

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running on port http://localhost:${port}`);
});
