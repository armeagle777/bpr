const getAsylumTotalDb = async ({ year, period }) => {
  // const petregistrUrl = process.env.PETREGISTR_URL;
  // const options = {
  //   jsonrpc: "2.0",
  //   id: 1,
  //   method: "company_info",
  //   params: { tax_id: hvhh },
  // };
  // const { data } = await axios.post(petregistrUrl, options);
  // if (!data.result) {
  //   return [];
  // }
  // const {
  //   result: { company },
  // } = data;
  // return company;
  return [
    {
      key: "Ռուսաստան",
      country: "Ռուսաստան",
      applications: 332,
      shortened: 933,
      rejected: 1265,
      asylum: 139,
    },
    {
      key: "Ղազախստան",
      country: "Ղազախստան",
      applications: 2,
      shortened: 7,
      rejected: 9,
      asylum: 3,
    },
    {
      key: "Բելառուս",
      country: "Բելառուս",
      applications: 12,
      shortened: 11,
      rejected: 23,
      asylum: 6,
    },
  ];
};

const getAsylumApplicationsDb = async ({ year, period }) => {
  return [
    {
      key: "Ռուսաստան",
      country: "Ռուսաստան",
      F_16: 332,
      M_16: 933,
      T_16: 1265,
      F_35: 139,
      M_35: 683,
      T_35: 822,
      F_65: 0,
      M_65: 7,
      T_65: 7,
      F_T: 472,
      M_T: 1625,
      T_T: 2097,
    },
    {
      key: "Ղազախստան",
      country: "Ղազախստան",
      F_16: 2,
      M_16: 7,
      T_16: 9,
      F_35: 3,
      M_35: 4,
      T_35: 7,
      F_65: 0,
      M_65: 0,
      T_65: 0,
      F_T: 5,
      M_T: 11,
      T_T: 16,
    },
    {
      key: "Բելառուս",
      country: "Բելառուս",
      F_16: 12,
      M_16: 11,
      T_16: 23,
      F_35: 6,
      M_35: 11,
      T_35: 17,
      F_65: 0,
      M_65: 0,
      T_65: 0,
      F_T: 18,
      M_T: 22,
      T_T: 40,
    },
  ];
};

const getAsylumDecisionsDb = async ({ year, period }) => {
  return [
    {
      key: "Ռուսաստան",
      country: "Ռուսաստան",
      F_16: 332,
      M_16: 933,
      T_16: 1265,
      F_35: 139,
      M_35: 683,
      T_35: 822,
      F_65: 0,
      M_65: 7,
      T_65: 7,
      F_T: 472,
      M_T: 1625,
      T_T: 2097,
    },
    {
      key: "Ղազախստան",
      country: "Ղազախստան",
      F_16: 2,
      M_16: 7,
      T_16: 9,
      F_35: 3,
      M_35: 4,
      T_35: 7,
      F_65: 0,
      M_65: 0,
      T_65: 0,
      F_T: 5,
      M_T: 11,
      T_T: 16,
    },
    {
      key: "Բելառուս",
      country: "Բելառուս",
      F_16: 12,
      M_16: 11,
      T_16: 23,
      F_35: 6,
      M_35: 11,
      T_35: 17,
      F_65: 0,
      M_65: 0,
      T_65: 0,
      F_T: 18,
      M_T: 22,
      T_T: 40,
    },
  ];
};

const getAsylumYearsDb = async ({ year, period }) => {
  return [
    {
      key: "2021",
      year: 2021,
      applicants: 332,
      asylums: 933,
      rejected: 1265,
      shortened: 139,
    },
    {
      key: "2022",
      year: 2022,
      applicants: 2,
      asylums: 7,
      rejected: 9,
      shortened: 3,
    },
    {
      key: "2023",
      year: 2023,
      applicants: 12,
      asylums: 11,
      rejected: 23,
      shortened: 6,
    },
  ];
};

module.exports = {
  getAsylumTotalDb,
  getAsylumApplicationsDb,
  getAsylumDecisionsDb,
  getAsylumYearsDb,
};
