const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const connectToServer = require('./db/conn');
const {typeDefs, resolvers} = require('./schemas');
const app = express();
const path = require('path');
const cors = require("cors");

// Connect to MongoDB and start the server
const startServer = async() => {
  app.use(cors())

  const server = new ApolloServer({ typeDefs, resolvers });

  await server.start();

  // Apply the Apollo middleware to the Express app
  server.applyMiddleware({ app });

  // if in production environment, serve static files in ../client/build
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
  }

  // at root route, send initial index.html to client and javascript code will render the rest
  app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
  });

  connectToServer();

  // Start the server
  app.listen({ port: process.env.PORT || 3001 }, () => {
    console.log(`Server ready at http://localhost:${process.env.PORT || 3001}${server.graphqlPath}`);
  });
};

 startServer();