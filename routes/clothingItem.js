const router = require("express").Router();
const {
  createItem,
  // updateItem,
  deleteItem,
  likeItem,
  unlikeItem,
  getItems,
} = require("../controllers/clothingItem");
const {
  validateClothingItemCreation,
  validateId,
} = require("../middlewares/validation");
// CRUD

// Create
router.post("/", validateClothingItemCreation, createItem); // baserul/items

// Read
router.get("/", getItems);

// update
// router.put("/:itemId", updateItem); //baseurl/items/itemid
router.put("/:itemId/likes", validateId, likeItem);

// delete
router.delete("/:itemId", validateId, deleteItem);
router.delete("/:itemId/likes", validateId, unlikeItem);

module.exports = router;
