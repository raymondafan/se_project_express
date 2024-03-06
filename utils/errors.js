const CREATED = 201;
const OK = 200;
const BAD_REQUEST = 400;
const NOT_FOUND = 404;
const INTERNAL_SERVER_ERROR = 500;
const UNAUTHORIZED = 401;
const REQUEST_CONFLICT = 409;
const FORBIDDEN = 403;
module.exports = {
  OK,
  BAD_REQUEST,
  NOT_FOUND,
  INTERNAL_SERVER_ERROR,
  CREATED,
  UNAUTHORIZED,
  REQUEST_CONFLICT,
  FORBIDDEN,
};
// const deleteItem = (req, res) => {
//   const { itemId } = req.params;
//   console.log(itemId);
//   ClothingItem.findByIdAndDelete(itemId)
//     .orFail()
//     .then((item) => {
//       if (itemId === user._id) {
//         res.status(OK).set("Content-Type", "application/json").send(item);
//       }
//     })
//     .catch((err) => {
//       console.error(err);
//       if (err.name === "DocumentNotFoundError") {
//         return res.status(403).send({ message: "Invalid data" });
//       }
//       if (err.name === "CastError") {
//         return res.status(BAD_REQUEST).send({ message: err.message });
//       }
//       return res
//         .status(INTERNAL_SERVER_ERROR)
//         .send({ message: "An error has occurred on the server." });
//     });
// };
