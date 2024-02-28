const router = require("express").Router();
const { getCurrentUser, createUser, getUser, login } = require("../controllers/users");

router.get("/", getCurrentUser);
// router.get("/:userId", getUser);
// router.post("/", createUser);

module.exports = router;
