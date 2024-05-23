const jwt = require("jsonwebtoken");

const { JWT_SECRET } = require("../utils/config");
const { UnauthorizedError } = require("../utils/errors/Unauthorized_Error");

const handleAuthErr = () => {
  throw new UnauthorizedError("Authorization Error");
};

const extractBearerToken = (header) => header.replace("Bearer ", "");
/* eslint consistent-return: off */
module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith("Bearer ")) {
    return handleAuthErr(res);
  }
  const token = extractBearerToken(authorization);
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return handleAuthErr(res);
  }

  req.user = payload;
  next();
};

