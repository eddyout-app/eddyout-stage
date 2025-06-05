"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const forceDatabaseRefresh = false;
const express_1 = __importDefault(require("express"));
const connection_js_1 = require("./config/connection.js");
const index_js_1 = __importDefault(require("./routes/index.js"));
const schedule_routes_js_1 = require("./routes/api/schedule-routes.js");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3001;
app.use(express_1.default.json());
app.use(index_js_1.default);
app.use("/api/schedule", schedule_routes_js_1.scheduleRouter);
app.use(express_1.default.static("../client/dist"));
connection_js_1.sequelize.sync({ force: forceDatabaseRefresh }).then(() => {
    app.listen(PORT, () => {
        console.log(`Server is listening on port http://localhost:${PORT}`);
    });
});
//# sourceMappingURL=server.js.map