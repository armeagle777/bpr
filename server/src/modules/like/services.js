const { Op } = require("sequelize");

const ApiError = require("../../exceptions/api-error");
const { Like } = require("../../config/sphereDatabase");

const createLikeDb = async (req) => {
  const { user, params, body } = req;
  const { id: userId } = user;
  const { uid } = params;
  const { text } = body;

  const [likeRow, created] = await Like.findOrCreate({
    where: { uid, userId },
    defaults: {
      text,
    },
  });

  if (!likeRow && !created) {
    throw ApiError.BadRequest("Missing data");
  }

  if (likeRow) {
    await Like.destroy();
  }

  return {
    data: created || likeRow,
  };
};

module.exports = {
  createLikeDb,
};
