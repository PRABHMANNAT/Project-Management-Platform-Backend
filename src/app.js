import express from "express";
const app = express();

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.get("/instagram", (req, res) => {
  res.send("this is an Instagram page");
});

export default app;
