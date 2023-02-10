const express = require("express");
 
// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const workoutRoutes = express.Router();
 
// This will help us connect to the database
const dbo = require("../db/conn");
 
// This helps convert the id from string to ObjectId for the default _id.
const ObjectId = require("mongodb").ObjectId;
 
 
// This section will help you get a list of all the workout records.
workoutRoutes.route("/workout").get(function (req, res) {
 let db_connect = dbo.getDb("trainTrackDB");
 db_connect
   .collection("workouts")
   .find({})
   .toArray(function (err, result) {
     if (err) throw err;
     res.json(result);
   });
});
 
// This section will help you get a single workout by id
workoutRoutes.route("/workout/:id").get(function (req, res) {
 let db_connect = dbo.getDb();
 let myQuery = { _id: ObjectId(req.params.id) };
 db_connect
   .collection("workouts")
   .findOne(myQuery, function (err, result) {
     if (err) throw err;
     res.json(result);
   });
});
 
// This section will help you create a new record.
workoutRoutes.route("/workout/add").post(function (req, response) {
 let db_connect = dbo.getDb();
 let newWorkout = {
   name: req.body.name,
   exercises: req.body.exercises,
 };
 db_connect.collection("workouts").insertOne(newWorkout, function (err, res) {
   if (err) throw err;
   response.json(res);
 });
});
 
// This section will help you update a record by id.
workoutRoutes.route("/update/:id").post(function (req, response) {
 let db_connect = dbo.getDb();
 let myQuery = { _id: ObjectId(req.params.id) };
 let newValues = {
   $set: {
     name: req.body.name,
     exercises: req.body.exercises,
   },
 };
 db_connect
   .collection("workouts")
   .updateOne(myQuery, newValues, function (err, res) {
     if (err) throw err;
     console.log("1 document updated");
     response.json(res);
   });
});
 
// This section will help you delete a record
workoutRoutes.route("/:id").delete((req, response) => {
 let db_connect = dbo.getDb();
 let myQuery = { _id: ObjectId(req.params.id) };
 db_connect.collection("workouts").deleteOne(myQuery, function (err, obj) {
   if (err) throw err;
   console.log("1 document deleted");
   response.json(obj);
 });
});
 
module.exports = workoutRoutes;