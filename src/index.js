import app from "./app.js";
import logger from "./configs/logger.config.js";
import mongoose from "mongoose";

//env variables
const PORT = process.env.PORT || 8000;
const urlDb = process.env.DATABASE_URL;

//exit on mongodb errors
mongoose.connection.on("error", (err) => {
  logger.error("error connecting to mongodb", err);
  process.exit(1);
});

//mongodb debug mode
if (process.env.NODE_ENV === "production") {
  mongoose.set("debug", true);
}

//mongodb connection
mongoose.connect(urlDb, {}).then(() => logger.info("connected to Mongodb"));

let server;
server = app.listen(PORT, () => {
  //console.log(`server is running on http://localhost:${PORT}...`);
  logger.info(`server is running on http://localhost:${PORT}...`);
});

const exitHandler = () => {
  if (server) {
    logger.info("Server closed");
    process.exit(1);
  } else {
    process.exit(1);
  }
};

// handle server errors
const unexpectedErrorHandler = (err) => {
  logger.error(err);
  exitHandler();
};

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);

//SIGTERM

process.on("SIGTERM", () => {
  if (server) {
    logger.info("Server closed");
    process.exit(1);
  }
});
