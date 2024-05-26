const axios = require("axios");

const getCompanyByHvhhDb = async (hvhh) => {
  const petregistrUrl = process.env.PETREGISTR_URL;

  const options = {
    jsonrpc: "2.0",
    id: 1,
    method: "company_info",
    params: { tax_id: hvhh },
  };

  const { data } = await axios.post(petregistrUrl, options);

  if (!data.result) {
    return [];
  }

  const {
    result: { company },
  } = data;

  return company;
};

module.exports = {
  getCompanyByHvhhDb,
};
