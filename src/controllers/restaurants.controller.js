import { getDb } from "../services/db.service.js";

const getRestaurants = async (req, res) => {
  const dbConnect = getDb();

  dbConnect
    .collection("restaurants")
    .find({})
    .limit(50)
    .toArray(function (err, result) {
      if (err) {
        res.status(400).send("Error fetching comments!");
      } else {
        res.json(result);
      }
    });
};

export { getRestaurants };
