const { validateAccessToken } = require("../utils/common");
const { ERROR_MESSAGES } = require("../utils/constants");

const authMiddleware = (req, res, next) => {
  if (req.method === "OPTIONS") {
    next();
  }

  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        statusCode: 401,
        message: ERROR_MESSAGES.MIDDLEWARE_MESSAGES.NOT_AUTHORIZED,
      });
    }
    const decodedData = validateAccessToken(token);

    if (!decodedData) {
      return res.status(401).json({
        statusCode: 401,
        message: ERROR_MESSAGES.MIDDLEWARE_MESSAGES.NOT_AUTHORIZED,
      });
    }
    req.user = decodedData;
    next();
  } catch (err) {
    return res.status(401).json({
      statusCode: 401,
      message: ERROR_MESSAGES.MIDDLEWARE_MESSAGES.NOT_AUTHORIZED,
    });
  }
};

module.exports = { authMiddleware };
