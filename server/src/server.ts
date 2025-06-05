import express, { Application } from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import typeDefs from "./schemas/typedefs/index.js";
import { resolvers } from "./schemas/resolvers/index.js";
import db from "./config/connection.js"; // Mongoose connection
import cors from "cors";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();  // No need to specify path if the .env file is in the root

// Log the MongoDB URI to ensure it's being loaded correctly
console.log("DEBUG SERVER: MONGODB_URI =", process.env.MONGODB_URI);

// Log the server's port to ensure the value is loaded from the environment variables
console.log("DEBUG SERVER: PORT =", process.env.PORT);

// Define the app and port
const app: Application = express(); // ✅ explicitly typed
const PORT = process.env.PORT || 3001;

// Apollo Server setup
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

async function startApolloServer() {
  await server.start();

  app.use(
    "/graphql",
    cors({ origin: "http://localhost:3000", credentials: true }),
    express.json(),
    expressMiddleware(server)
  );

  // Wait for the MongoDB connection to open
  db.once("open", () => {
    console.log("🌱 MongoDB connection established.");
    app.listen(PORT, () => {
      console.log(`🌐 Server running at http://localhost:${PORT}/graphql`);
    });
  });
}

startApolloServer();
