const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const httpStatus = require("http-status");
const ApiError = require("./utils/ApiError");
const routes = require("./routes/v1");
const { errorHandler } = require("./middleware/error");
const config = require("./config/config");
const app = express();

process.on("SIGTERM", () => {
  logger.info("SIGTERM received");
  if (app) {
    app.close();
  }
});

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.options("*", cors());

app.use(express.json());

app.use("/v1", routes);

app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
});

app.use(errorHandler);

mongoose.set("strictQuery", true);
mongoose
  .connect(config.mongoose.url)
  .then(() => {
    console.log("Connected to MongoDB");

    //console.log(`${config.port}`)
    app.listen(config.port, () => {
      console.log(`App is running on port ${config.port}`);
    });
  });
