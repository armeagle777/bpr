const axios = require("axios");
const qs = require("qs");

const ApiError = require("../../exceptions/api-error");

const getPersonBySsnDb = async (params) => {
  const bprUrl = process.env.BPR_URL;
  const { ssn } = params;

  var queryData = qs.stringify({
    psn: ssn,
    addresses: "ALL",
  });

  var config = {
    method: "post",
    url: bprUrl,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: queryData,
  };

  const response = await axios(config);

  const { status, result } = response.data;

  if (status === "failed") {
    return [];
  }

  const persons = data.map((person) => {
    const { AVVDocuments, AVVAddresses, ...restInfo } = person;
    const addresses = AVVAddresses.AVVAddress;
    const documents = AVVDocuments.Document;
    return { addresses, documents, ...restInfo };
  });

  return persons;
};

const getSearchedPersonsDb = async (body) => {
  const bprUrl = process.env.BPR_URL;

  const {
    firstName,
    lastName,
    patronomicName,
    birthDate,
    documentNumber,
    ssn,
  } = body;

  const searchData = { addresses: "ALL" };

  if (ssn) {
    searchData.psn = ssn;
  }

  if (firstName) {
    searchData.first_name = firstName;
  }

  if (lastName) {
    searchData.last_name = lastName;
  }

  if (patronomicName) {
    searchData.middle_name = patronomicName;
  }

  if (birthDate) {
    searchData.birth_date = birthDate;
  }

  if (documentNumber) {
    searchData.docnum = birthDate;
  }

  var queryData = qs.stringify(searchData);

  var config = {
    method: "post",
    url: bprUrl,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: queryData,
  };

  const response = await axios(config);

  const { status, result } = response.data;

  if (status === "failed") {
    return [];
  }

  const persons = data.map((person) => {
    const { AVVDocuments, AVVAddresses, ...restInfo } = person;
    const addresses = AVVAddresses.AVVAddress;
    const documents = AVVDocuments.Document;
    return { addresses, documents, ...restInfo };
  });

  return persons;
};

const getDocumentsBySsnDb = async (ssn, firstName, lastName) => {
  const qkagUrl = process.env.QKAG_URL;

  var queryData = qs.stringify({
    ssn,
    first_name: firstName,
    last_name: lastName,
  });

  var config = {
    method: "post",
    url: qkagUrl,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: queryData,
  };

  const response = await axios(config);

  const { status, result } = response.data;

  const documents = Object.values(result);

  if (documents.length === 0) {
    return [];
  }

  return documents;
};

const getTaxBySsnDb = async (ssn) => {
  const taxUrl = process.env.TAX_URL;

  const { data } = await axios.post(`${taxUrl}`, { ssn });

  if (!data.taxPayersInfo) {
    return [];
  }

  const {
    taxPayersInfo: { taxPayerInfo },
  } = data;

  return taxPayerInfo;
};

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
  getPersonBySsnDb,
  getDocumentsBySsnDb,
  getTaxBySsnDb,
  getCompanyByHvhhDb,
};
