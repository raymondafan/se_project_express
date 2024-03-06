const mongoose = require("mongoose");
const validator = require("validator");
const isEmail = require("validator/lib/isEmail");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: [true, "The avatar field is required."],
    validate: {
      validator(value) {
        return validator.isURL(value);
      },
      message: "You must enter a valid URL",
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (value) => isEmail(value),
      message: "You must enter a valid email",
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});
userSchema.statics.findUserByCredentials = function findUserByCredentials(
  email,
  password,
) {
  console.log("Finding user by credentials. Email:", email);
  if (!email || !password) {
    console.log("Bad Request: Missing email or password");
    // Throw a custom error for bad request
    throw new Error("Bad Request");
  }

  return this.findOne({ email })
    .select("+password") // this — the User model
    .then((user) => {
      console.log("User found:", user);
      // not found - rejecting the promise
      if (!user) {
        console.log("User not found");
        return Promise.reject(new Error("Incorrect email or password"));

      }

      // found - comparing hashes
      console.log("Stored hashed password:", user.password);
      console.log("Received password:", password);
      return bcrypt.compare(password, user.password).then((matched) => {
        console.log("Password comparison result:", matched);
        if (!matched) {
          console.log("Incorrect password");
          return Promise.reject(new Error("Incorrect email or password"));
        }
        console.log("User authenticated");
        return user;
      });
    });
};

module.exports = mongoose.model("user", userSchema);
