const { getCompanyByHvhhDb } =
  process.env.NODE_ENV === "local"
    ? require("./services-local")
    : require("./services");

const getCompanyByHvhh = async (req, res, next) => {
  try {
    const { hvhh } = req.params;

    const company = await getCompanyByHvhhDb(hvhh);

    res.status(200).json(company);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getCompanyByHvhh,
};
