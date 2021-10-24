const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();

// Import routes

const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const verify = require("./routes/verifyToken");

// Connect to DB

mongoose.connect(process.env.DATABASE_URL, () => {
  console.log("connected to mongodb successfully");
});

// Route middlewares

app.use(express.json());

app.use("/api/user", authRoute);
app.use("/api/posts", verify, postRoute);

app.listen(5000, () => console.log("running on port 5000"));
