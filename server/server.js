// import express server package
const express = require("express");
// instance of our express server
const app = express();

// allows cross origin resource sharing
const cors = require("cors");

// graphql middleware: runs before every request and is different from REST. instead of HTTP requests there are mutations
// and queries. Queries similar to a GET and Mutations similar to post, put
const {ApolloServer} = require('apollo-server-express');

// import and configure dotenv package
require("dotenv").config({ path: "./config.env" });

const port = process.env.PORT || 3001;
app.use(cors());
app.use(express.json());

// use routes defined in workout.js
app.use(require("./routes/workout"));

const server = new ApolloServer({
  typeDefs,
  resolvers,
})


// get driver connection
const dbo = require("./db/conn");
 
app.listen(port, () => {
  // perform a database connection when server starts
  dbo.connectToServer(function (err) {
    if (err) console.error(err);
 
  });
  console.log(`Server is running on port: ${port}`);
});