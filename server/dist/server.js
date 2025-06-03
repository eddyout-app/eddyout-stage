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
const app = (0, express_1.default)(); // ✅ explicitly typed
const PORT = process.env.PORT || 3001;
const server = new server_1.ApolloServer({
    typeDefs: index_js_1.default,
    resolvers: index_js_2.resolvers,
});
async function startApolloServer() {
    await server.start();
    // ✅ Attach middleware properly
    app.use("/graphql", express_1.default.json(), (0, express4_1.expressMiddleware)(server));
    connection_js_1.default.once("open", () => {
        app.listen(PORT, () => {
            console.log(`🌐 Server running at http://localhost:${PORT}/graphql`);
        });
    });
}
startApolloServer();
