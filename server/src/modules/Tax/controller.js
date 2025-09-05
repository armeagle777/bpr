const {
  getCompanyObligationsDB,
} = require("./services");


const getCompanyObligations = async (req, res, next) => {
  try {
    const companyObligationsData = await getCompanyObligationsDB(req);

    res.status(200).json(companyObligationsData);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getCompanyObligations,
};
