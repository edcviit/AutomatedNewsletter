const express = require("express");

const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const adminRouter = require("./routes/admin");
require("dotenv").config();

const MongoPassword = process.env.MongoPassword;
// console.log(MongoPassword);
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  // Access raw headers
  const rawHeaders = req.rawHeaders;

  // Log raw headers
  console.log("Raw Headers:", rawHeaders);

  next();
});
app.use((req, res, next) => {
  console.log(req.ip);
  next();
});
app.use("/admin", adminRouter);

app.get("/", (req, res) => {
  console.log(Date().toString());
  res.send("EDC Backend");
});
app.get("/add", (req, res) => {
  const a = parseInt(req.query.a);
  const b = parseInt(req.query.b);
  console.log(a);
  res.json({ ans: a + b });
});

mongoose.connect(
  `mongodb+srv://edcviit:${MongoPassword}@cluster0.koohght.mongodb.net/newsletters`
);
app.listen(process.env.PORT || 3001, () => {
  console.log(`App listening on port http://localhost:3001`);
});
