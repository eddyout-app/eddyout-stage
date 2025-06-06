import express, { Application } from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import typeDefs from "./schemas/typedefs/index.js";
import { resolvers } from "./schemas/resolvers/index.js";
import db from "./config/connection.js"; // Mongoose connection
import cors from "cors";
import dotenv from "dotenv";
import path from "path"; // Import path to serve static files

// Load environment variables
dotenv.config();

// Log the MongoDB URI to ensure it's being loaded correctly
console.log("DEBUG SERVER: MONGODB_URI =", process.env.MONGODB_URI);

// Log the server's port to ensure the value is loaded from the environment variables
console.log("DEBUG SERVER: PORT =", process.env.PORT);

// Define the app and port
const app: Application = express();
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

  // Serve static files (client-side) in production
  if (process.env.NODE_ENV === "production") {
    console.log("DEBUG: Serving static files from", path.join(__dirname, "../../client/dist"));
    app.use(express.static(path.join(__dirname, "../../client/dist")));  // Serve files from `client/dist`

    // Serve assets (JS, CSS) from `client/dist/assets/`
    app.use("/assets", express.static(path.join(__dirname, "../../client/dist/assets")));

    // Serve `index.html` for any non-API route (to let React Router handle routing)
    app.get("*", (_, res) => {
      console.log("DEBUG: Serving index.html for client-side routing");
      res.sendFile(path.join(__dirname, "../../client/dist/index.html"));
    });
  }

  console.log("DEBUG SERVER: NODE_ENV =", process.env.NODE_ENV);  // Log NODE_ENV to confirm it's set correctly

  // Wait for MongoDB connection to open
  db.once("open", () => {
    console.log("🌱 MongoDB connection established.");
    app.listen(PORT, () => {
      console.log(`🌐 Server running at http://localhost:${PORT}/graphql`);
    });
  });
}

startApolloServer();
