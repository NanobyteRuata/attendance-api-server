import { Router } from "express";
import { profile, register, signIn } from "../controllers/userController.js";

const userRoute = Router();

userRoute.route("/auth/register").post(register);
userRoute.route("/auth/sign_in").post(signIn);
userRoute.route("/user/profile").get(profile);

export default userRoute;
