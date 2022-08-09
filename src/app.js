import express from "express";
import cors from "cors";
import restaurantRoutes from "./routes/restaurants.route.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(restaurantRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Global error handling
app.use(function (err, _req, res) {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

export default app;
