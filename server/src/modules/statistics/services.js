const fs = require("fs");
const XLSX = require("xlsx");
const v4 = require("uuid").v4;
const Sequelize = require("sequelize");

const {
  monthsMap,
  statByYearQuery,
  statisticsSequelize,
  decTypeTableNameMap,
  reportsBasicData,
} = require("./constants");
const {
  formatAsylumQuery,
  formatTotalAsylumQuery,
  formatTotalBorderCrossQuery,
  formatPeriodBorderCrossQuery,
  formatCountryBorderCrossQuery,
  formatEaeuEmployeeQuery,
  formatEaeuEmployeeFamQuery,
  formatWpQuery,
  formatVolunteerQuery,
  formatEaeuOfficialQuery,
  formatEaeuEmployeeFamOfficialQuery,
  formatWpOfficialQuery,
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
      query = formatVolunteerQuery({
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

  const statData = await wpSequelize.query(query, {
    type: Sequelize.QueryTypes.SELECT,
  });

  const formatedData = statData?.map((row, index) => ({ ...row, key: index }));
  return formatedData;
};

//TODO wp statistics
const getOfficialWPStatisticsDb = async ({
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
      query = formatEaeuOfficialQuery({
        year,
        month,
        period,
        claim_type,
        report_type,
      });
      break;
    case "eaeu_employee_family":
      query = formatEaeuEmployeeFamOfficialQuery({
        year,
        month,
        period,
        claim_type,
        report_type,
      });
      break;
    case "work_permit":
      query = formatWpOfficialQuery({
        year,
        month,
        period,
        claim_type,
        report_type,
      });
      break;
    default:
      return [];
  }

  const statData = await wpSequelize.query(query, {
    type: Sequelize.QueryTypes.SELECT,
  });

  // const formatedData = statData?.map((row, index) => ({ ...row, key: index }));
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

const createPdfService = async (req) => {
  let tableData;
  const { body } = req;
  const { filters } = body;
  const { year, period, statisticsType } = { ...filters };
  switch (statisticsType) {
    case "asylum":
      {
        if (period === "annual") {
          const table_annual_1 = await getAsylumDecisionsDb({
            year,
            period: "annual",
            decType: "2",
          });
          const table_annual_2_a = await getAsylumDecisionsDb({
            year,
            period: "annual",
            decType: "1",
          });
          const table_annual_2_b = await getAsylumDecisionsDb({
            year,
            period: "annual",
            decType: "4",
          });
          tableData = { table_annual_1, table_annual_2_a, table_annual_2_b };
        } else if (period === "h1") {
          const table_halfOne_1 = await getAsylumApplicationsDb({
            year,
            period: "h1",
          });
          const table_halfOne_2 = await getAsylumDecisionsDb({
            year,
            period: "h1",
            decType: "3",
          });
          const table_halfOne_3 = await getAsylumDecisionsDb({
            year,
            period: "h1",
            decType: "2",
          });
          const table_halfOne_4_a = await getAsylumDecisionsDb({
            year,
            period: "h1",
            decType: "1",
          });
          const table_halfOne_4_b = await getAsylumDecisionsDb({
            year,
            period: "h1",
            decType: "4",
          });

          tableData = {
            table_halfOne_1,
            table_halfOne_2,
            table_halfOne_3,
            table_halfOne_4_a,
            table_halfOne_4_b,
          };
        } else if (period === "h2") {
          const table_halfTwo_1 = await getAsylumApplicationsDb({
            year,
            period: "h2",
          });
          const table_halfTwo_2 = await getAsylumDecisionsDb({
            year,
            period: "h2",
            decType: "3",
          });
          const table_halfTwo_3 = await getAsylumDecisionsDb({
            year,
            period: "h2",
            decType: "2",
          });
          const table_halfTwo_4_a = await getAsylumDecisionsDb({
            year,
            period: "h2",
            decType: "1",
          });
          const table_halfTwo_4_b = await getAsylumDecisionsDb({
            year,
            period: "h2",
            decType: "4",
          });

          tableData = {
            table_halfTwo_1,
            table_halfTwo_2,
            table_halfTwo_3,
            table_halfTwo_4_a,
            table_halfTwo_4_b,
          };
        }
      }
      break;
    case "wp_1":
      {
        const table_1_data = getOfficialWPStatisticsDb({
          year,
          period,
          wp_type: "eaeu_employee",
          claim_type: "all",
          report_type: 1,
        });
        const table_2_data = getOfficialWPStatisticsDb({
          year,
          period,
          wp_type: "eaeu_employee",
          claim_type: "all",
          report_type: 2,
        });
        //TODO define report_type
        const table_3_data = getOfficialWPStatisticsDb({
          year,
          period,
          wp_type: "eaeu_employee",
          claim_type: "all",
          report_type,
        });

        //TODO define report_type
        const table_4_data = getOfficialWPStatisticsDb({
          year,
          period,
          wp_type: "eaeu_employee",
          claim_type: "all",
          report_type,
        });

        //TODO define report_type
        const table_5_data = getOfficialWPStatisticsDb({
          year,
          period,
          wp_type: "eaeu_employee",
          claim_type: "all",
          report_type,
        });

        tableData = {
          table_1_data,
          table_2_data,
          table_3_data,
          table_4_data,
          table_5_data,
        };
      }
      break;
    case "wp_2":
      {
        //wp_type -> eaeu_employee , eaeu_employee_family , work_permit
        const table_1_data = getOfficialWPStatisticsDb({
          year,
          period,
          wp_type: "eaeu_employee_family",
          claim_type: "all",
          report_type: 1,
        });
        const table_2_data = getOfficialWPStatisticsDb({
          year,
          period,
          wp_type: "eaeu_employee_family",
          claim_type: "all",
          report_type: 2,
        });
        //TODO define report_type
        const table_3_data = getOfficialWPStatisticsDb({
          year,
          period,
          wp_type: "eaeu_employee_family",
          claim_type: "all",
          report_type,
        });
        //TODO define report_type
        const table_4_data = getOfficialWPStatisticsDb({
          year,
          period,
          wp_type: "eaeu_employee_family",
          claim_type: "all",
          report_type,
        });

        tableData = {
          table_1_data,
          table_2_data,
          table_3_data,
          table_4_data,
        };
      }
      break;
    case "wp_3":
      {
        //wp_type -> eaeu_employee , eaeu_employee_family , work_permit
        const table_1_data = getOfficialWPStatisticsDb({
          year,
          period,
          wp_type: "work_permit",
          claim_type: "all",
          report_type: 1,
        });

        const table_2_data = getOfficialWPStatisticsDb({
          year,
          period,
          wp_type: "work_permit",
          claim_type: "all",
          report_type: 2,
        });
        //TODO define report_type
        const table_3_data = getOfficialWPStatisticsDb({
          year,
          period,
          wp_type: "work_permit",
          claim_type: "all",
          report_type,
        });
        //TODO define report_type
        const table_4_data = getOfficialWPStatisticsDb({
          year,
          period,
          wp_type: "work_permit",
          claim_type: "all",
          report_type,
        });
        //TODO define report_type
        const table_5_data = getOfficialWPStatisticsDb({
          year,
          period,
          wp_type: "work_permit",
          claim_type: "all",
          report_type,
        });
        //TODO define report_type
        const table_6_data = getOfficialWPStatisticsDb({
          year,
          period,
          wp_type: "work_permit",
          claim_type: "all",
          report_type,
        });

        tableData = {
          table_1_data,
          table_2_data,
          table_3_data,
          table_4_data,
          table_5_data,
          table_6_data,
        };
      }
      break;
    default:
      tableData = {};
  }

  const fileName = await createPDF({
    data: { reportsBasicData, tableData, year },
    statisticsType,
    period,
  });
  return fileName;
};

module.exports = {
  getAsylumTotalDb,
  getAsylumYearsDb,
  createPdfService,
  insertDataFromFile,
  getAsylumDecisionsDb,
  getBorderCrossTotalDb,
  getAsylumApplicationsDb,
  getBorderCrossPeriodsDb,
  getSimpleWPStatisticsDb,
  getBorderCrossCountriesDb,
};
