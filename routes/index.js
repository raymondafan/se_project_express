const router = require("express").Router();
const clothingItem = require("./clothingItem");
const userRouter = require("./users");
const { NOT_FOUND } = require("../utils/errors");
const { createUser, login } = require("../controllers/users");
const authorization = require("../middlewares/auth");
const { getItems } = require("../controllers/clothingItem");
const {
  validateUserLogin,
  validateCreateUser,
} = require("../middlewares/validation");

router.post("/signin", validateUserLogin, login);
router.post("/signup", validateCreateUser, createUser);
router.get("/items", getItems);

router.use(authorization);
router.use("/items", clothingItem); // baseUrl/items
router.use("/users", userRouter);

router.use((req, res) => {
  res.status(NOT_FOUND).send({ message: "Document not found" });
});
// router works as a subapplication that we can register handlers on
// like app.use
module.exports = router;
