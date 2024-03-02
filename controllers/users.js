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
} = require("../utils/errors");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { JWT_SECRET } = require("../utils/config");
const user = require("../models/user");
// GET /users
const getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      // prevents response from beig sent
      res.status(OK).send(users);
    })
    // user.find is asynch so use .then, returns user that we find
    .catch((err) => {
      console.error(err);
      return res.status(INTERNAL_SERVER_ERROR).send({ message: err.message });
      // not really checking for specific types of errors
      // because there is not rlly any errors that we can specifically
      // check for or handle
      // have this in all of .catch() blocks
    });
};
// POST
const createUser = (req, res) => {
  const { name, avatar, email, password } = req.body;
  // pull info from body of req
  // "req.body" has info that is sent in the
  // body of the request
  bcrypt
    .hash(password, 10)
    .then((hash) => {
      return User.create({ name, avatar, email, password: hash });
    })
    .then((user) => {
      console.log(user);
      res.status(CREATED).send(user);
    })
    .catch((err) => {
      console.error(err);
      // ^gives u info about the error
      // how youll know unexpected occurs
      // or else it will occur silently wont be able to figure out what the error was
      if (err.code === 11000) {
        //mongodb duplicate error
        return res.status(BAD_REQUEST).send({
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
  if (!email) {
    return res.send(BAD_REQUEST).send({ message: err.message });
  }
  return User.findUserByCredentials(email, password, res)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      return res.status(OK).send({ token });
    })
    .catch((err) => {
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
      upsert: true, // if the user entry wasn't found, it will be created
    },
  )
    .orFail()
    .then((user) => {
      if (!user) {
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

module.exports = { getUsers, createUser, login, getCurrentUser, updateUser };
