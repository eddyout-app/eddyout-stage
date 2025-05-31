import express, { Application } from "express";
import { ApolloServer } from "apollo-server-express";
import typeDefs from "./schemas/typedefs/index.js";
import { tripResolvers } from "./schemas/resolvers/tripResolvers.js";
import db from "./config/connection.js"; // Mongoose connection

const app: Application = express(); // ✅ explicitly typed
const PORT = process.env.PORT || 3001;

const server = new ApolloServer({
  typeDefs,
  resolvers: [tripResolvers],
});

async function startApolloServer() {
  await server.start();

  // ✅ Attach middleware properly
  server.applyMiddleware({ app }); // this is OK in v4 when typed correctly!

  db.once("open", () => {
    app.listen(PORT, () => {
      console.log(`🌐 Server running at http://localhost:${PORT}${server.graphqlPath}`);
    });
  });
}

startApolloServer();
