import express from "express";

//create express app
const app = express();

app.get("/", (req, res) => {
  res.send("heloo from server apliation");
});

export default app;
