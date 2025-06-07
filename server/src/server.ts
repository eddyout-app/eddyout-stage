import express, { Application } from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import typeDefs from "./schemas/typedefs/index.js";
import { resolvers } from "./schemas/resolvers/index.js";
import db from "./config/connection.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app: Application = express();
const PORT = process.env.PORT || 3001;

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

async function startApolloServer() {
  console.log("🔧 Apollo Server setup starting");
  await server.start();
  console.log("✅ Apollo Server started");

  app.use(
    "/graphql",
    cors({ origin: "http://localhost:3000", credentials: true }),
    express.json(),
    expressMiddleware(server)
  );

  // ✅ Confirm this block is running in logs
  if (process.env.NODE_ENV === "production") {
    const clientBuildPath = path.resolve(__dirname, "../../client/dist");
    console.log("📦 Serving static client from:", clientBuildPath);

    app.use(express.static(clientBuildPath));
    app.use("/assets", express.static(path.join(clientBuildPath, "assets")));

    app.get("*", (_, res) => {
      console.log("📄 Serving index.html for client route");
      res.sendFile(path.join(clientBuildPath, "index.html"));
    });
  }

  db.once("open", () => {
    console.log("🌱 MongoDB connection established.");
    app.listen(PORT, () => {
      console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
    });
  });
}

startApolloServer();
