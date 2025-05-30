import express from "express";
import db from "./config/connection.js"; // now imports Mongo connection
import routes from "./routes/index.js";
import { scheduleRouter } from "./routes/api/schedule-routes.js";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(routes);
app.use("/api/schedule", scheduleRouter);

app.use(express.static("../client/dist"));

db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`🌐 Server is listening on http://localhost:${PORT}`);
  });
});
