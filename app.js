const express = require("express");
const cors = require("cors");
const createAppError = require("./utils/appError");

const router = require("./routes");
const errorHandler = require("./utils/errorHandler");

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.use("/api", router);

app.all("*", (req, res, next) => {
  next(createAppError(`The URL ${req.originalUrl} does not exists`, 404));
});
app.use(errorHandler);

const PORT = 5001;
app.listen(PORT, () => {
  console.log("server is listening on port 5001...");
});

module.exports = app;
