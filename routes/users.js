const router = require("express").Router();
const { getCurrentUser, updateUser } = require("../controllers/users");
const { validateUpdateUser } = require("../middlewares/validation");

router.get("/me", getCurrentUser);
router.patch("/me", validateUpdateUser, updateUser);
// router.get("/:userId", getUser);
// router.post("/", createUser);

module.exports = router;
