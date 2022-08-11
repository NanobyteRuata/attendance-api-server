import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import jsonwebtoken from "jsonwebtoken";

import "./models/index.js";
import routes from "./routes/index.js";

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

const option = {
  socketTimeoutMS: 30000,
  keepAlive: true,
};

try {
  await mongoose.connect(process.env.ATLAS_URI, option);
  console.log("Successfully connected to the database!");
} catch (err) {
  console.log("Error connecting the database!\n", err);
  process.exit();
}

app.use(function (req, res, next) {
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "JWT"
  ) {
    jsonwebtoken.verify(
      req.headers.authorization.split(" ")[1],
      process.env.JWT_SECRET_KEY,
      function (err, decode) {
        if (err) req.user = undefined;
        req.user = decode;
        next();
      }
    );
  } else {
    req.user = undefined;
    next();
  }
});

for (let route of routes) {
  app.use(route);
}

app.get("/", (req, res) => {
  res.send("Hello World!");
});

export default app;
