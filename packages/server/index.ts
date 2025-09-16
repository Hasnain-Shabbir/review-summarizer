import express from "express";
import dotenv from "dotenv";
const app = express();
const PORT = 3000;

dotenv.config();

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from the API!" });
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
