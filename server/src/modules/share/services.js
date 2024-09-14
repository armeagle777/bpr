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
  console.log("body In Share::::::", body);

  const { uid, text, comment, users } = body;

  const newLikeRow = await Like.create({
    uid,
    userId,
    text,
  });

  return {
    data: newLikeRow,
  };
};

module.exports = {
  shareInfoDb,
  getSharesDB,
};
