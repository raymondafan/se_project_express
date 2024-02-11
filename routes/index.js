const router = require("express").Router()

const userRouter = require("./users");

router.use("/users", userRouter)
//router works as a subapplication that we can register handlers on
//like app.use
module.exports= router;