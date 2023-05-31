import dotenv from "dotenv";
dotenv.config();
import app from "./app";

app.listen(process.env.PORT, () => {
  console.log(`Server running on port http://localhost:${process.env.PORT}/v1`);
});
