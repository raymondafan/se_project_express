const CREATED = 201;
const OK = 200;
const BAD_REQUEST = 400;
const NOT_FOUND = 404;
const INTERNAL_SERVER_ERROR = 500;
const UNAUTHORIZED = 401;
const REQUEST_CONFLICT = 409;
const FORBIDDEN = 403;

class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = BAD_REQUEST;
  }
}

class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = UNAUTHORIZED;
  }
}

class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = FORBIDDEN;
  }
}

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = NOT_FOUND;
  }
}

class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = REQUEST_CONFLICT;
  }
}

// Error handling middleware
const errorHandler = (err, req, res, next) => {
  console.error(err);
  const statusCode = err.statusCode || INTERNAL_SERVER_ERROR;
  res.status(statusCode).json({ message: err.message });
};
// app.use((err, req, res, next) => {
//   console.error(err);
//   const { statusCode = INTERNAL_SERVER_ERROR, message } = err;
//   res.status(statusCode).send({
//     message:
//       statusCode === INTERNAL_SERVER_ERROR
//         ? "An error occured on the server"
//         : message,
//   });
// });

const handleErrors = (err, message, next) => {
  if (err.code === 11000) {
    // mongodb duplicate error
    const errorMessage = "Duplicate error. " + message;
    const error = new ConflictError(errorMessage);
    return next(error);
  }
  if (err.name === "ValidationError") {
    // checking if err.name equals "ValidationError"
    const errorMessage = "Validation error. " + message;
    const error = new BadRequestError(errorMessage);
    return next(error);
    // if it does, we send response (400 error)
    // err.message=> message
  }
  if (err.name === "DocumentNotFoundError") {
    const errorMessage = "User not found. " + message;
    const error = new NotFoundError(errorMessage);
    return next(error);
  }
  if (err.name === "CastError") {
    const errorMessage = "Bad request data. " + message;
    const error = new BadRequestError(errorMessage);
    return next(error);
  }
  if (err.message === "Incorrect email or password") {
    const errorMessage = "Authentication error: " + message;
    const error = new UnauthorizedError(errorMessage);
    return next(error);
  }
  

};

module.exports = {
  handleErrors,
  OK,
  BAD_REQUEST,
  NOT_FOUND,
  INTERNAL_SERVER_ERROR,
  CREATED,
  UNAUTHORIZED,
  REQUEST_CONFLICT,
  FORBIDDEN,
  errorHandler,
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  ConflictError,
};
// const errorMessage = "User not found.";
//     const error = new NotFoundError(errorMessage);
//     return next(error);
