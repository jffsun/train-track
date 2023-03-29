// access .env 
require('dotenv').config();

const { MongoClient } = require("mongodb");

const uri = process.env.MONGO_URI;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let db;

async function connectToServer() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
    db = client.db("train-track");
  } catch (error) {
    console.log("Error connecting to MongoDB", error);
  }
}

module.exports = connectToServer;