const forceDatabaseRefresh = false;

import express from "express";
import { sequelize } from "./config/connection.js";
import routes from "./routes/index.js";
import { scheduleRouter } from "./routes/api/schedule-routes.js";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(routes);
app.use("/api/schedule", scheduleRouter);

app.use(express.static("../client/dist"));

sequelize.sync({ force: forceDatabaseRefresh }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is listening on port http://localhost:${PORT}`);
  });
});
