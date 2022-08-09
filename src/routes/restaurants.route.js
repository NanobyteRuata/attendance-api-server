import { Router } from "express";
import { getRestaurants } from "../controllers/restaurants.controller.js";

const restaurantRoutes = Router();

restaurantRoutes.route("/restaurants").get(getRestaurants);

export default restaurantRoutes;
