const {
  getAsylumTotalDb,
  getAsylumApplicationsDb,
  getAsylumDecisionsDb,
  getAsylumYearsDb,
} =
  process.env.NODE_ENV === "local"
    ? require("./services-local")
    : require("./services");

const getAsylumTotal = async (req, res, next) => {
  try {
    const { year, period, month } = req.body;
    const data = await getAsylumTotalDb({ year, period, month });

    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};

const getAsylumApplications = async (req, res, next) => {
  try {
    const { year, period, month } = req.body;
    const data = await getAsylumApplicationsDb({ year, period, month });

    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};

const getAsylumDecisions = async (req, res, next) => {
  try {
    const { year, period, decType, month } = req.body;
    const data = await getAsylumDecisionsDb({ year, period, decType, month });

    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};

const getAsylumYears = async (req, res, next) => {
  try {
    const data = await getAsylumYearsDb();

    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAsylumTotal,
  getAsylumApplications,
  getAsylumDecisions,
  getAsylumYears,
};
