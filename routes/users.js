const router = require("express").Router();
const { getCurrentUser, updateUser } = require("../controllers/users");

router.get("/me", getCurrentUser);
router.patch("/me", updateUser)
// router.get("/:userId", getUser);
// router.post("/", createUser);

module.exports = router;
