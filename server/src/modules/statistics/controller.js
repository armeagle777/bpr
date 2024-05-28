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
    const { year, period } = req.body;
    const data = await getAsylumTotalDb({ year, period });

    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};

const getAsylumApplications = async (req, res, next) => {
  try {
    const { year, period } = req.body;
    const data = await getAsylumApplicationsDb({ year, period });

    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};

const getAsylumDecisions = async (req, res, next) => {
  try {
    const { year, period } = req.body;
    const data = await getAsylumDecisionsDb({ year, period });

    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};

const getAsylumYears = async (req, res, next) => {
  try {
    const { year, period } = req.body;
    const data = await getAsylumYearsDb({ year, period });

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
