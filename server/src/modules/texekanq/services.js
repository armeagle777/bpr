const { Op } = require("sequelize");

const ApiError = require("../../exceptions/api-error");
const { Texekanq } = require("../../config/sphereDatabase");
const { getTexekanqUid, getTexekanqTitle } = require("./helpers");

// const getLikesDB = async (req) => {
//   const { user } = req;
//   const { id: userId } = user;
//   const likes = await Like.findAll({
//     where: { userId },
//     attributes: { exclude: ["userId"] },
//   });

//   return {
//     likes,
//   };
// };

const createTexekanqDb = async (req) => {
  const { user, params, body } = req;
  const { id: userId } = user;
  console.log("body", body);
  const {
    pnum,
    person_birth,
    person_birth_place,
    person_fname,
    person_lname,
    person_mname,
    TexekanqtypeId,
    mul_number,
  } = body;

  const texekanqRow = await Texekanq.findOne({
    where: { mul_number, userId },
  });

  if (texekanqRow) {
    throw ApiError.BadRequest("Texekanq already exists");
  }
  const uid = getTexekanqUid();
  const title = getTexekanqTitle();

  const newTexekanq = await Texekanq.create({
    uid,
    userId,
    title,
    pnum,
    person_birth,
    person_birth_place,
    person_fname,
    person_lname,
    person_mname,
    TexekanqtypeId,
    mul_number,
  });

  return newTexekanq;
};

module.exports = {
  createTexekanqDb,
};
