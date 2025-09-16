import express from "express";
import dotenv from "dotenv";
const app = express();
const PORT = 3000;

dotenv.config();

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
