const User = require("../models/user");

//GET /users
const getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      //prevents response from beig sent
      res.status(200).send(users);
    })
    //user.find is asynch so use .then, returns user that we find
    .catch((err) => {
      console.error(err);
      return res.status(500).send({ message: err.message });
      //not really checking for specific types of errors
      //because there is not rlly any errors that we can specifically
      //check for or handle
      //have this in all of .catch() blocks
    });
};

const createUser = (req, res) => {
  const { name, avatar } = req.body;
  //pull info from body of req
  //"req.body" has info that is sent in the
  //body of the request
  User.create({ name, avatar })
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return res.status(400).send({ message: err.message });
      }
      return res.status(500).send({ message: err.message });
    });
};
const getUser= (req,res)=>{
const{userId}= req.params;
User.findById(userId)
.orFail()
//if its valid but u dont find matching doc
//it will throw a " doc.found " error
.then((user) => res.status(200).send(user))

.catch((err) => {
  console.error(err);
  if (err.name === "DocumentNotFoundError") {
    return res.status(404).send({ message: err.message });
  } else if(err.name === "CastError") {
//handle cast error (400)
  }
  return res.status(500).send({ message: err.message });
});
}

module.exports = { getUsers, createUser, getUser};
