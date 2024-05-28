const { getAsylumTotalDb } =
  process.env.NODE_ENV === "local"
    ? require("./services-local")
    : require("./services");

const getAsylumTotal = async (req, res, next) => {
  try {
    const { year, period } = req.body;
    const data = await getAsylumTotalDb({ year, period });

    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAsylumTotal,
};
