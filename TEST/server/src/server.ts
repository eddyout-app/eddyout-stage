// Import dependencies
import express from "express";
import { sequelize } from "./config/connection.js";
import routes from "./routes/index.js";
import { scheduleRouter } from "./routes/api/schedule-routes.js";

// Configuration
const FORCE_DB_REFRESH = false;
const PORT = process.env.PORT || 3001;

// Initialize Express app
const app = express();

// Middleware
app.use(express.json());
app.use(routes);
app.use("/api/schedule", scheduleRouter);

// Serve static files
app.use(express.static("../client/dist"));

// Database & Server Start
(async () => {
  try {
    await sequelize.sync({ force: FORCE_DB_REFRESH });
    app.listen(PORT, () => {
      console.log(`EDDYOUT server is running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to initialize the database or server:", error);
    process.exit(1);
  }
})();