const fs = require("fs");
const XLSX = require("xlsx");
const v4 = require("uuid").v4;
const Sequelize = require("sequelize");

const {
  monthsMap,
  statByYearQuery,
  statisticsSequelize,
  decTypeTableNameMap,
} = require("./constants");
const {
  formatAsylumQuery,
  formatSimpleWpQuery,
  formatTotalAsylumQuery,
  formatTotalBorderCrossQuery,
  formatPeriodBorderCrossQuery,
  formatCountryBorderCrossQuery,
} = require("./helpers");
const { Cross, sahmanahatumSequelize } = require("../../config/sahmanahatumDb");
const { createPDF } = require("../../utils/common");
const { wpSequelize } = require("../../config/wpDatabase");

const fakeData = {
  title: "A new Brazilian School",
  date: "05/12/2018",
  name: "Rodolfo",
  age: 28,
  birthdate: "12/07/1990",
  course: "Computer Science",
  obs: "Graduated in 2014 by Federal University of Lavras, work with Full-Stack development and E-commerce.",
};

const createPdf = async (req) => {
  const { body } = req;
  const { filters } = body;
  const { year, period, statisticsType } = { ...filters };

  const fileName = await createPDF({ data: fakeData, statisticsType, period });

  return fileName;
};

const getAsylumTotalDb = async ({ year, period, month }) => {
  const query = formatTotalAsylumQuery({
    year,
    month,
    period,
  });

  const statData = await statisticsSequelize.query(query, {
    type: Sequelize.QueryTypes.SELECT,
  });

  return statData;
};

const getAsylumApplicationsDb = async ({ year, period, month }) => {
  const query = formatAsylumQuery({
    table_name: "applied_for_asylum",
    year,
    month,
    period,
  });

  const statData = await statisticsSequelize.query(query, {
    type: Sequelize.QueryTypes.SELECT,
  });

  return statData;
};

const getAsylumDecisionsDb = async ({ year, period, decType, month }) => {
  const query = formatAsylumQuery({
    table_name: decTypeTableNameMap[decType],
    year,
    month,
    period,
  });
  const statData = await statisticsSequelize.query(query, {
    type: Sequelize.QueryTypes.SELECT,
  });
  return statData;
};

const getAsylumYearsDb = async () => {
  const statData = await statisticsSequelize.query(statByYearQuery, {
    type: Sequelize.QueryTypes.SELECT,
  });
  return statData;
};

const insertDataFromFile = async (files) => {
  const excelDocument = files.filepond;
  const filePath = "./src/public/" + v4() + "_" + excelDocument.name;
  await excelDocument.mv(filePath);

  const workBook = XLSX.readFile(filePath);
  const workSheet = workBook.Sheets[workBook.SheetNames[0]];
  const data = XLSX.utils.sheet_to_row_object_array(workSheet);

  const filteredData = data.reduce((acc, row) => {
    const {
      IN,
      OUT,
      Month: period,
      BP: cross_point,
      "Cross type": cross_type,
      "Doc. Country": country,
    } = row;

    if (period && cross_type && country && cross_point && IN >= 0 && OUT >= 0) {
      const [year, month] = period.split(" ");

      acc.push({
        in_count: IN,
        cross_point,
        out_count: OUT,
        year: Number(year),
        month: monthsMap[month],
        cross_type,
        country,
      });
    }

    return acc;
  }, []);

  await bulkUpsert(Cross, filteredData);
  fs.rmSync(filePath, {
    force: true,
  });

  return {
    status: true,
    message: "File is uploaded",
    data: {
      name: excelDocument.name,
      mimetype: excelDocument.mimetype,
      size: excelDocument.size,
    },
  };
};

const getBorderCrossTotalDb = async ({ year, period, month, borderCross }) => {
  const query = formatTotalBorderCrossQuery({
    year,
    month,
    period,
    borderCross,
  });

  const statData = await sahmanahatumSequelize.query(query, {
    type: Sequelize.QueryTypes.SELECT,
  });

  return statData;
};

const getBorderCrossCountriesDb = async ({ year, period, month }) => {
  const query = formatCountryBorderCrossQuery({
    year,
    month,
    period,
  });

  const statData = await sahmanahatumSequelize.query(query, {
    type: Sequelize.QueryTypes.SELECT,
  });

  return statData;
};

const getBorderCrossPeriodsDb = async ({ year, period, month }) => {
  const query = formatPeriodBorderCrossQuery({
    year,
    month,
    period,
  });

  const statData = await sahmanahatumSequelize.query(query, {
    type: Sequelize.QueryTypes.SELECT,
  });

  return statData;
};

const getSimpleWPStatisticsDb = async ({
  year,
  month,
  period,
  wp_type,
  claim_type,
  report_type,
}) => {
  let query;
  switch (wp_type) {
    case "eaeu_employee":
      query = formatEaeuEmployeeQuery({
        year,
        month,
        period,
        claim_type,
        report_type,
      });
      break;
    case "eaeu_employee_family":
      query = formatEaeuEmployeeFamQuery({
        year,
        month,
        period,
        claim_type,
        report_type,
      });
      break;
    case "work_permit":
      query = formatWpQuery({
        year,
        month,
        period,
        claim_type,
        report_type,
      });
      break;
    case "volunteer":
      query = query = formatVolunteerQuery({
        year,
        month,
        period,
        claim_type,
        report_type,
      });
      break;
    default:
      return null;
  }

  const MOCK_DATA = [
    {
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
  const statData = await wpSequelize.query(query, {
    type: Sequelize.QueryTypes.SELECT,
  });
  console.log("statData::::::", statData);

  return statData;
};

// Function to perform bulk upsert
async function bulkUpsert(model, data) {
  const query = `
      INSERT INTO ${model.getTableName()} (${Object.keys(data[0]).join(", ")})
      VALUES ${data.map(() => "(?)").join(", ")}
      ON DUPLICATE KEY UPDATE in_count = VALUES(in_count),
      out_count = VALUES(out_count)
    `;

  await sahmanahatumSequelize.query(query, {
    replacements: data.map((item) => Object.values(item)),
    type: Sequelize.QueryTypes.INSERT,
  });
}

module.exports = {
  getAsylumTotalDb,
  getAsylumApplicationsDb,
  getAsylumDecisionsDb,
  getAsylumYearsDb,
  insertDataFromFile,
  getBorderCrossTotalDb,
  getBorderCrossCountriesDb,
  getBorderCrossPeriodsDb,
  getSimpleWPStatisticsDb,
  createPdf,
};
