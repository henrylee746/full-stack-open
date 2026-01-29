import express from "express";
import parseArguments from "./bmi";

const app = express();

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (_req, res) => {
  console.log(_req.query.height);
  res.send({
    height: _req.query.height,
    weight: _req.query.weight,
  });
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
