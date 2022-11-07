const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const authRoute = require("./routes/auth");
const app = express();

dotenv.config();

mongoose.connect(
  "mongodb+srv://vietanh99:niemtin99@cluster0.0zujylb.mongodb.net/?retryWrites=true&w=majority",
  () => {
    console.log("connect to mongo DB");
  }
);
app.use(cors());
app.use(cookieParser()); // giup tao cookie hoac gan cookie
app.use(express.json());

// ROUTERS
app.use("/v1/auth", authRoute);

app.listen(8000, () => {
  console.log("Server is running");
});

// AUTHENTICATION => chuc nang login - signup
// AUTHORIZATION =>
