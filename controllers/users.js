const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
// export const BAD_REQUEST_STATUS_CODE= 400;
// ^neds to be in a separate file that will have several constants like this^
// no hard coded #'s
// imoirt it into controllers and use that in place of hard coded #s
const {
  OK,
  BAD_REQUEST,
  NOT_FOUND,
  INTERNAL_SERVER_ERROR,
  CREATED,
  UNAUTHORIZED,
  REQUEST_CONFLICT,
} = require("../utils/errors");

const { JWT_SECRET } = require("../utils/config");


// POST
const createUser = (req, res) => {
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
      console.error(err);
      // ^gives u info about the error
      // how youll know unexpected occurs
      // or else it will occur silently wont be able to figure out what the error was
      if (err.code === 11000) {
        // mongodb duplicate error
        return res.status(REQUEST_CONFLICT).send({
          message: "Email already exists. Please use a different email.",
        });
      }
      if (err.name === "ValidationError") {
        // checking if err.name equals "ValidationError"
        return res.status(BAD_REQUEST).send({ message: err.message });
        // if it does, we send response (400 error)
        // err.message=> message
      }
      return res.status(INTERNAL_SERVER_ERROR).send({ message: err.message });
    });
};
const getCurrentUser = (req, res) => {
  User.findById(req.user._id)
    .orFail()
    // if its valid but u dont find matching doc
    // it will throw a " doc.found " error
    .then((user) => res.status(OK).send(user))

    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        return res.status(NOT_FOUND).send({ message: "Invalid data" });
      }
      if (err.name === "CastError") {
        return res.status(BAD_REQUEST).send({ message: err.message });
      }
      return res.status(INTERNAL_SERVER_ERROR).send({ message: err.message });
    });
};

const login = (req, res) => {
  const { email, password } = req.body;
  console.log("Received request with email:", email, "and password:", password);
  if (!email || !password) {
    console.log("Bad Request: Missing email or password", email);
    return res.status(BAD_REQUEST).send({ message: "Bad Request" });
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
      console.log("Authentication error:", err.message);

      if (err.message === "Incorrect email or password") {
        return res.status(UNAUTHORIZED).send({ message: err.message });
      }

      return res.status(INTERNAL_SERVER_ERROR).send({ message: err.message });
    });
};

const updateUser = (req, res) => {
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
        return res.status(NOT_FOUND).send({ message: "User not found" });
      }
      return res.status(OK).send({ data: user });
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        // checking if err.name equals "ValidationError"
        return res.status(BAD_REQUEST).send({ message: err.message });
      }

      return res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: "Internal server error" });
    });
};

module.exports = { createUser, login, getCurrentUser, updateUser };
