const { getPropertiesBySsnDb } = require("./services");

const getPropertiesBySsn = async (req, res, next) => {
  try {
    const { ssn } = req.params;

    const companies = await getPropertiesBySsnDb(ssn);

    res.status(200).json(companies);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getPropertiesBySsn,
};
