import "../common/load-env.js";
import { MongoClient } from "mongodb";

const connectionString = process.env.ATLAS_URI;

const client = new MongoClient(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let dbConnection;

const connectToServer = async (callback) => {
  try {
    const db = await client.connect();

    dbConnection = db.db("sample_restaurants");
    console.log("Successfully connected to MongoDB.");

    return callback();
  } catch (err) {
    return callback(err);
  }
};

const getDb = () => {
  return dbConnection;
};

export { connectToServer, getDb };
