"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import dependencies
const express_1 = __importDefault(require("express"));
const connection_js_1 = require("./config/connection.js");
const index_js_1 = __importDefault(require("./routes/index.js"));
const schedule_routes_js_1 = require("./routes/api/schedule-routes.js");
// Configuration
const FORCE_DB_REFRESH = false;
const PORT = process.env.PORT || 3001;
// Initialize Express app
const app = (0, express_1.default)();
// Middleware
app.use(express_1.default.json());
app.use(index_js_1.default);
app.use("/api/schedule", schedule_routes_js_1.scheduleRouter);
// Serve static files
app.use(express_1.default.static("../client/dist"));
// Database & Server Start
(async () => {
    try {
        await connection_js_1.sequelize.sync({ force: FORCE_DB_REFRESH });
        app.listen(PORT, () => {
            console.log(`EDDYOUT server is running at http://localhost:${PORT}`);
        });
    }
    catch (error) {
        console.error("Failed to initialize the database or server:", error);
        process.exit(1);
    }
})();
