const router = require("express").Router();
const clothingItem = require("./clothingItem");
const userRouter = require("./users");

router.use("/items", clothingItem);
router.use("/users", userRouter);


router.use((res, req) => {
  res.status(500).send({ message: "Router not found" });
});
//router works as a subapplication that we can register handlers on
//like app.use
module.exports = router;
