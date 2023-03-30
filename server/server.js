const express = require('express');
const { ApolloServer } = require('apollo-server-express');

const db = require('./db/conn');
const {typeDefs, resolvers} = require('./schemas');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3001;
const server = new ApolloServer({ typeDefs, resolvers });

app.use(express.urlencoded({extended: false}));

// if in production environment, serve static files in ../client/build
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

// at root route, send initial index.html to client and javascript code will render rest
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

// Connect to MongoDB and start the server
const startApolloServer = async() => {

  await server.start();

  // Apply the Apollo middleware to the Express app
  server.applyMiddleware({ app });

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    })
  })
};

 startApolloServer(typeDefs, resolvers);