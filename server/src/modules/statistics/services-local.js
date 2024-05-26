const axios = require("axios");

const getCompanyByHvhhDb = async (hvhh) => {
  const taxUrl = process.env.PETREGISTR_URL;
  const { data } = await axios.get(`${taxUrl}?fake_tax_id=${hvhh}`);

  if (data.length === 0) {
    return [];
  }

  const {
    result: { company },
  } = data[0];

  return company;
};

module.exports = { getCompanyByHvhhDb };
