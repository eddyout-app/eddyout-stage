"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import dependencies
const express_1 = __importDefault(require("express"));
// import routes from "./routes/index.js";
// import { scheduleRouter } from "./routes/api/schedule-routes.js";
const node_path_1 = __importDefault(require("node:path"));
const server_1 = require("@apollo/server"); // Note: Import from @apollo/server-express
const express4_1 = require("@apollo/server/express4");
const index_js_1 = require("./schemas/index.js");
const auth_js_1 = require("./utils/auth.js");
const server = new server_1.ApolloServer({
    typeDefs: index_js_1.typeDefs,
    resolvers: index_js_1.resolvers
});
const startApolloServer = async () => {
    await server.start();
    const PORT = process.env.PORT || 4000;
    const app = (0, express_1.default)();
    app.use(express_1.default.urlencoded({ extended: false }));
    app.use(express_1.default.json());
    app.use('/graphql', (0, express4_1.expressMiddleware)(server, {
        context: auth_js_1.authenticateToken
    }));
    if (process.env.NODE_ENV === 'production') {
        app.use(express_1.default.static(node_path_1.default.join(__dirname, '../../client/dist')));
        app.get('*', (_req, res) => {
            res.sendFile(node_path_1.default.join(__dirname, '../../client/dist/index.html'));
        });
    }
    app.listen(PORT, () => {
        console.log(`API server running on port ${PORT}!`);
        console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    });
};
startApolloServer();
//# sourceMappingURL=server.js.map