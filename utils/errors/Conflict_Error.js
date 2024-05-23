const REQUEST_CONFLICT = 409;
class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = REQUEST_CONFLICT;
  }
}
module.exports = {
  ConflictError,
};
