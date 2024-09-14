const { Op } = require("sequelize");

const ApiError = require("../../exceptions/api-error");
const { Share } = require("../../config/sphereDatabase");

const getSharesDB = async (req) => {
  const { user } = req;
  const { id: userId } = user;
  const shares = await Share.findAll({
    where: { toUserId: userId },
    attributes: { exclude: ["toUserId"] },
  });

  return {
    shares,
  };
};

const shareInfoDb = async (req) => {
  const { user, params, body } = req;
  const { id: userId } = user;

  const { uid, text, comment, receivers } = body;
  if (!uid || !text || !receivers.length) {
    throw ApiError.BadRequest("Missing fields");
  }
  const insertions = receivers?.map((receiverId) => ({
    uid,
    text,
    comment,
    fromUserId: userId,
    toUserId: receiverId,
  }));

  const newLikeRows = await Share.bulkCreate(insertions);

  return {
    data: newLikeRows,
  };
};

module.exports = {
  shareInfoDb,
  getSharesDB,
};
