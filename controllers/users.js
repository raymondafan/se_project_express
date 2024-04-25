const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
// export const BAD_REQUEST_STATUS_CODE= 400;
// ^neds to be in a separate file that will have several constants like this^
// no hard coded #'s
// imoirt it into controllers and use that in place of hard coded #s
const {
  OK,
  CREATED,
  handleErrors,
  BadRequestError,
  NotFoundError,
} = require("../utils/errors");

const { JWT_SECRET } = require("../utils/config");

// POST
const createUser = (req, res, next) => {
  const { name, avatar, email, password } = req.body;
  // pull info from body of req
  // "req.body" has info that is sent in the
  // body of the request
  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({ name, avatar, email, password: hash }))
    .then((user) => User.findById(user._id).select("-password"))
    .then((userWithoutPassword) => {
      res.status(CREATED).send(userWithoutPassword);
    })
    .catch((err) => {
      const message = "Failed to create user.";
      handleErrors(err, message, next);
    });
};
const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail()
    // if its valid but u dont find matching doc
    // it will throw a " doc.found " error
    .then((user) => res.status(OK).send(user))

    .catch((err) => {
      const message = "Failed to find user.";
      handleErrors(err, message, next);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  console.log("Received request with email:", email, "and password:", password);

  if (!email || !password) {
    console.log("Bad Request: Missing email or password", email);
    const errorMessage = "Missing email or password.";
    const error = new BadRequestError(errorMessage);
    return next(error);
  }
  console.log("Proceeding with authentication...");
  return User.findUserByCredentials(email, password, res)
    .then((user) => {
      console.log("User authenticated:", user);

      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      console.log("Sending response with token:", token);
      return res.status(OK).send({ token });
    })
    .catch((err) => {
      const message = "Incorrect email or password";
      handleErrors(err, message, next);
    });
};

const updateUser = (req, res, next) => {
  User.findByIdAndUpdate(
    req.user._id,
    { name: req.body.name, avatar: req.body.avatar },
    {
      new: true, // the then handler receives the updated entry as input
      runValidators: true, // the data will be validated before the update
      select: "-password",
    },
  )
    .orFail(() => ({ name: null, avatar: null }))
    .then((user) => {
      if (!user || !user._id) {
        const errorMessage = "User not found.";
        const error = new NotFoundError(errorMessage);
        return next(error);
      }
      return res.status(OK).send({ data: user });
    })
    .catch((err) => {
      const message = "An error occurred while updating the user.";
      handleErrors(err, message, next);
    });
};

module.exports = { createUser, login, getCurrentUser, updateUser };
