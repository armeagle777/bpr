const axios = require("axios");

const { getTaxRequestOptions } = require("./helpers");

const { createLog } = require("../log/services");
const {
  getEkengRequestsEndDate,
} = require("../../utils/common");



const getCompanyObligationsDB = async (req) => {
  const tin = req.params.tin;
  const startDate = req.query.startDate || "1970-01-01";
  const endDate = req.query.endDate || getEkengRequestsEndDate();

  const ekengRequestProps = { tin, startDate, endDate };

  await createLog({ req, logText: tin });

  const axiosOptions = getTaxRequestOptions(
    ekengRequestProps,
    "tin_info_obligation/v1"
  );
  const { data } = await axios(axiosOptions);
  return data?.ssn_obligations_response?.responseStatus?.statusCode === 1
    ? data.ssn_obligations_response
    : null;
};

module.exports = {
  getCompanyObligationsDB,
};
