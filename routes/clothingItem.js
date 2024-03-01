const router = require("express").Router();
const {
  createItem,
  getItems,
  // updateItem,
  deleteItem,
  likeItem,
  unlikeItem,
} = require("../controllers/clothingItem");
// CRUD

// Create
router.post("/", createItem); // baserul/items

// Read
// router.get("/", getItems);

// update
// router.put("/:itemId", updateItem); //baseurl/items/itemid
router.put("/:itemId/likes", likeItem);

// delete
router.delete("/:itemId", deleteItem);
router.delete("/:itemId/likes", unlikeItem);

module.exports = router;
