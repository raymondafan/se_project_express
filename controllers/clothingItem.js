const ClothingItem = require("../models/clothingItem");
const { OK, handleErrors } = require("../utils/errors");
const { ForbiddenError } = require("../utils/errors/Forbidden_Error");
const { NotFoundError } = require("../utils/errors/Not_Found_Error");
// post request to baseurl/items
const createItem = (req, res, next) => {
  console.log(req);
  console.log(req.body);
  const { name, weather, imageUrl } = req.body;

  ClothingItem.create({ name, weather, imageUrl, owner: req.user._id })

    .then((item) => {
      console.log(item);
      res.send({ data: item });
    })
    .catch((err) => {
      const message = "Failed to create item.";
      handleErrors(err, message, next);
    });
};
const getItems = (req, res, next) => {
  ClothingItem.find({})
    .then((items) => {
      res.send(items);
    })
    .catch((err) => {
      const message = "Failed to get item.";
      handleErrors(err, message, next);
    });
};

const deleteItem = (req, res, next) => {
  const { itemId } = req.params;
  console.log(itemId);

  ClothingItem.findById(itemId)
    .then((item) => {
      if (!item) {
        const errorMessage = "Item not found";
        const error = new NotFoundError(errorMessage);
        return next(error);
      }

      if (item.owner.toString() !== req.user._id.toString()) {
        const errorMessage = "Permission Denied";
        const error = new ForbiddenError(errorMessage);
        return next(error);
      }

      return ClothingItem.findByIdAndDelete(itemId).then((deletedItem) => {
        if (!deletedItem) {
          const errorMessage = "Item not found";
          const error = new NotFoundError(errorMessage);
          return next(error);
        }
        return res.send(deletedItem);
      });
    })

    .catch((err) => {
      const message = "Failed to delete item";
      handleErrors(err, message, next);
    });
};

const likeItem = (req, res, next) => {
  const { itemId } = req.params;
  console.log(req.user._id);
  ClothingItem.findByIdAndUpdate(
    itemId,

    { $addToSet: { likes: req.user._id } }, // adds _id to arra
    { new: true },
  )
    .orFail()
    .then((item) => {
      res.status(OK).send({ data: item });
    })
    .catch((err) => {
      const message = "Failed to like item";
      handleErrors(err, message, next);
    });
};
const unlikeItem = (req, res, next) => {
  const { itemId } = req.params;
  console.log(req.user._id);
  ClothingItem.findByIdAndUpdate(
    itemId,
    { $pull: { likes: req.user._id } }, // remove _id from the array
    { new: true },
  )
    .orFail()
    .then((item) => {
      res.status(OK).send({ data: item });
    })
    .catch((err) => {
      const message = "Failed to dislike item";
      handleErrors(err, message, next);
    });
};
module.exports = {
  createItem,
  getItems,
  deleteItem,
  likeItem,
  unlikeItem,
};
