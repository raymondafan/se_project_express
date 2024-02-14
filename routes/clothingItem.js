const router = require("express").Router();
const {
  createItem,
  getItems,
  updateItem,
  deleteItem,
  likeItem,
  unlikeItem,
} = require("../controllers/clothingItem");
//CRUD

//Create
router.post("/", createItem);

//Read
router.get("/", getItems);

//update
router.put("/:itemId", updateItem);
router.put("/items/:itemId/likes", likeItem);

//delete
router.delete("/:itemId", deleteItem);
router.delete("/items/:itemId/likes", unlikeItem);

module.exports = router;
