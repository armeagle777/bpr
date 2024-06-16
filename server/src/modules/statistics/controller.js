const {
  getAsylumTotalDb,
  getAsylumApplicationsDb,
  getAsylumDecisionsDb,
  getAsylumYearsDb,
  insertDataFromFile,
  getBorderCrossTotalDb,
  getBorderCrossCountriesDb,
  getBorderCrossPeriodsDb,
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

const uploadBorderCrossFile = async (req, res, next) => {
  try {
    const { files } = req;

    if (!files) {
      res.status(400).send({
        message: "No file uploaded",
      });
    }

    const dataRows = await insertDataFromFile(files);

    res.status(200).json(dataRows);
  } catch (err) {
    console.log("err::::::", err);

    next(err);
  }
};

const getBorderCrossTotal = async (req, res, next) => {
  try {
    const { year, period, month, borderCross } = req.body;
    const data = await getBorderCrossTotalDb({
      year,
      period,
      month,
      borderCross,
    });

    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};

const getBorderCrossCountries = async (req, res, next) => {
  try {
    const { year, period, month } = req.body;
    const data = await getBorderCrossCountriesDb({ year, period, month });

    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};

const getBorderCrossPeriods = async (req, res, next) => {
  try {
    const { year, period, month } = req.body;
    const data = await getBorderCrossPeriodsDb({
      year,
      period,
      month,
    });

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
  uploadBorderCrossFile,
  getBorderCrossTotal,
  getBorderCrossCountries,
  getBorderCrossPeriods,
};
