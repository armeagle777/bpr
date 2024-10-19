const { getWpDataDB } = require("./services");

const getWpData = async (req, res, next) => {
  try {
    const roles = await getWpDataDB(req);
    res.status(200).json(roles);
  } catch (err) {
    console.log("Error crating User:", err);
    next(err);
  }
};

module.exports = {
  getWpData,
};
