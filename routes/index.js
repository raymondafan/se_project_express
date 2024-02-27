const router = require("express").Router();
const clothingItem = require("./clothingItem");
const userRouter = require("./users");
const { NOT_FOUND } = require("../utils/errors");
const { createUser, login } = require("../controllers/users");

router.use("/items", clothingItem); // baseUrl/items
router.use("/users", userRouter);
router.post("/signin", login);
router.post("/signup", createUser);

router.use((req, res) => {
  res.status(NOT_FOUND).send({ message: "Router not found" });
});
// router works as a subapplication that we can register handlers on
// like app.use
module.exports = router;
