"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const server_1 = require("@apollo/server");
const express4_1 = require("@apollo/server/express4");
const index_js_1 = __importDefault(require("./schemas/typedefs/index.js"));
const index_js_2 = require("./schemas/resolvers/index.js");
const connection_js_1 = __importDefault(require("./config/connection.js")); // Mongoose connection
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config({
    path: path_1.default.resolve(__dirname, "../.env"),
});
const app = (0, express_1.default)(); // ✅ explicitly typed
const PORT = process.env.PORT || 3001;
const server = new server_1.ApolloServer({
    typeDefs: index_js_1.default,
    resolvers: index_js_2.resolvers,
});
async function startApolloServer() {
    await server.start();
    app.use("/graphql", (0, cors_1.default)({
        origin: "http://localhost:3000", // allow your React app
        credentials: true, // optional — if using cookies or auth headers
    }), express_1.default.json(), (0, express4_1.expressMiddleware)(server));
    connection_js_1.default.once("open", () => {
        app.listen(PORT, () => {
            console.log(`🌐 Server running at http://localhost:${PORT}/graphql`);
        });
    });
}
startApolloServer();
