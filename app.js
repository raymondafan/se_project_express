const express = require("express");
const errorHandler = require("./utils/errors");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const mainRouter = require("./routes/index");
const { errors } = require("celebrate");
const { requestLogger, errorLogger } = require("./middlewares/logger");
const { PORT = 3001 } = process.env;

app.use(cors());
// process.env allos u to vary port depending of what .env file to specify
// port as something diff when u use a diff port

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.log("Connected to DB");
  })
  .catch(console.error);

// The app.use() function is used to mount the specified
// middleware function(s) at the path that is being specified.
// It is mostly used to set up middleware for your application.

app.use(express.json());

app.use(requestLogger);
app.use(mainRouter);
app.use(errorLogger); // enabling the error logger
app.use(errors()); // celebrate error handler
app.use(errorHandler.errorHandler); //centralized error handler

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

console.log("sup");
