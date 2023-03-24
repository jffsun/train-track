require('dotenv').config(); // specify path to your .env file

console.log(process.env.ATLAS_URI);

const { MongoClient } = require("mongodb");

const Db = process.env.ATLAS_URI;
const client = new MongoClient(Db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

var _db;

module.exports = {
  connectToServer: function (callback) {
    client.connect(function (err, db) {
      if (db) {
        _db = db.db("train-trackDB");
        console.log("Successfully connected to MongoDB.");
      }
      return callback(err);
    });
  },
  getDb: function () {
    return _db;
  },
};