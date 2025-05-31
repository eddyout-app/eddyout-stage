"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const apollo_server_express_1 = require("apollo-server-express");
const index_js_1 = __importDefault(require("./schemas/typedefs/index.js"));
const tripResolvers_js_1 = require("./schemas/resolvers/tripResolvers.js");
const connection_js_1 = __importDefault(require("./config/connection.js")); // MongoDB connection (Mongoose)
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3001;
const server = new apollo_server_express_1.ApolloServer({
    typeDefs: index_js_1.default,
    resolvers: [tripResolvers_js_1.tripResolvers],
});
async function startApolloServer() {
    await server.start();
    // Apollo v4 uses getMiddleware instead of applyMiddleware
    app.use("/graphql", server.getMiddleware());
    // Optionally serve static files (like a React frontend)
    app.use(express_1.default.static("../client/dist"));
    connection_js_1.default.once("open", () => {
        app.listen(PORT, () => {
            console.log(`🌐 Server is running at http://localhost:${PORT}/graphql`);
        });
    });
}
startApolloServer();
