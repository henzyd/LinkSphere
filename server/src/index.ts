import { PORT } from "./env";
import "./db";
import app from "./app";

const port = PORT;

app.listen(port, () => {
  console.log(`Server running on port http://localhost:${port}`);
});
