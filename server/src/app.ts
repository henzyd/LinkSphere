import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const PORT = 5010;
app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}/v1`);
});

export default app;
