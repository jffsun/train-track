// import express server package
const express = require("express");

// graphql is a query language, explicitly outlining the input and output of a query, allowing for one api endpoint to handle multiple mutations and queries
// apollo server is an implementation of graphql. allows us to describe the types of data our api can handle + the available queries and mutations
const {ApolloServer} = require('apollo-server-express');

// TO DO: Create typeDefs and Resolvers
const {typeDefs, resolvers} = require('./schemas');

// import node.js package providing a way to work with file and directory paths
const path = require('path');

// allows cross origin resource sharing
const cors = require("cors");

// get driver connection
const db = require("./db/conn");

// initialize express app
const app = express();

// import and configure dotenv package
// require("dotenv").config({ path: "./config.env" });

// allow for app to interact with apis hosted on different domains
app.use(cors());

// recognizes request objects as a json object
app.use(express.json());

// when Apollo Server API receives query/mutation, Apollo Server uses resolvers you defined to fetch the data and return the results to the client in the format specified by the GraphQL specification.
// written in SDL (Schema Definition Language), typeDefs define the structure of the data that clients can query from your API
// resolvers are responsible for fetching and transforming that data from the underlying data sources that were requested by the client
const server = new ApolloServer({typeDefs, resolvers })

// if in production environment, serve static files in ../client/build
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

// at root route, send initial index.html to client and javascript code will render the rest
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
  });

// define the port
const port = process.env.PORT || 3001;
  
// start the server
const startApolloServer = async(typeDefs, resolvers) => {
  await server.start();
  server.applyMiddleware({app});

  db.once('open', () => {
      app.listen(port, () => {
        console.log(`API server running on port ${port}!`);
        console.log(`Use GraphQL at http://localhost:${port}${server.graphqlPath}`);
      })
  })
}

startApolloServer(typeDefs, resolvers);