import express, { Application } from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import typeDefs from "./schemas/typedefs/index.js";
import { resolvers } from "./schemas/resolvers/index.js";
import db from "./config/connection.js"; // Mongoose connection
import dotenv from "dotenv";
import path from "path";
import cors from "cors";

dotenv.config({
  path: path.resolve(__dirname, "../.env"),
});

const app: Application = express(); // ✅ explicitly typed
const PORT = process.env.PORT || 3001;

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

async function startApolloServer() {
  await server.start();

  app.use(
    "/graphql",
    cors({
      origin: "http://localhost:3000", // allow your React app
      credentials: true, // optional — if using cookies or auth headers
    }),
    express.json(),
    expressMiddleware(server)
  );

  db.once("open", () => {
    app.listen(PORT, () => {
      console.log(`🌐 Server running at http://localhost:${PORT}/graphql`);
    });
  });
}

startApolloServer();
