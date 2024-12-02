const { createTexekanqDb } = require("./services");

const createTexekanq = async (req, res, next) => {
  try {
    const texekanq = await createTexekanqDb(req);
    res.status(200).json(texekanq);
  } catch (err) {
    console.log("Error crating User:", err);
    next(err);
  }
};

// const getLikes = async (req, res, next) => {
//   try {
//     const likes = await getLikesDB(req);
//     res.status(200).json(likes);
//   } catch (err) {
//     console.log("Error crating User:", err);
//     next(err);
//   }
// };

module.exports = {
  createTexekanq,
};
