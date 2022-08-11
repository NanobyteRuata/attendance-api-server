import mongoose from "mongoose";
import { hashSync } from "bcrypt";
import jwt from "jsonwebtoken";
import "../common/load-env.js";

const User = mongoose.model("User");

const register = async (req, res) => {
  try {
    const newUser = new User(req.body);
    newUser.hash_password = hashSync(req.body.password, 10);
    const user = await newUser.save();
    user.hash_password = undefined;
    return res.status(201).json(user);
  } catch (error) {
    const errorMessage = error.message;

    return res.status(errorMessage ? 400 : 500).send({
      message: errorMessage || "Internal Server Error",
      error,
    });
  }
};

const signIn = async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
    });

    if (!user || !user.comparePassword(req.body.password)) {
      return res.status(401).json({
        message: "Authentication failed. Invalid user or password.",
      });
    }

    return res.json({
      token: jwt.sign(
        { email: user.email, fullName: user.fullName, _id: user._id },
        process.env.JWT_SECRET_KEY
      ),
    });
  } catch (error) {
    return res.status(500).send({
      message: "Internal Server Error",
      error,
    });
  }
};

const loginRequired = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    return res.status(401).json({ message: "Unauthorized user!!" });
  }
};

const profile = (req, res, next) => {
  if (req.user) {
    res.send(req.user);
    next();
  } else {
    return res.status(401).json({ message: "Invalid token" });
  }
};

export { register, signIn, loginRequired, profile };
