const { createLikeDb } = require("./services");

const createLike = async (req, res, next) => {
  try {
    const like = await createLikeDb(req);
    res.status(200).json(like);
  } catch (err) {
    console.log("Error crating User:", err);
    next(err);
  }
};

module.exports = {
  createLike,
};
