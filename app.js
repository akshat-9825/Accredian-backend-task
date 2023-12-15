const express = require("express");
// const cors = require("cors");
// const router = require("./routes");
// const AppError = require("./utils/appError");
// const errorHandler = require("./utils/errorHandler");

const app = express();

// app.use(api, router);

// app.all("*", (req, res, next) => {
//   next(new AppError(`The URL ${req.originalUrl} does not exists`, 404));
// });
// app.use(errorHandler);

const PORT = 5001;
app.listen(PORT, () => {
  console.log("server is listening on port 5001...");
});

// module.exports = app;
