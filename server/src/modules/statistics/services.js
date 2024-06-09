const Sequelize = require("sequelize");
const {
  statisticsSequelize,
  decTypeTableNameMap,
  statByYearQuery,
} = require("./constants");
const { formatAsylumQuery, formatTotalAsylumQuery } = require("./helpers");

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

const getAsylumApplicationsDb = async ({ year, period }) => {
  const query = formatAsylumQuery({
    table_name: "applied_for_asylum",
    year,
    month: 1,
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
  console.log("query", query);
  return;
  const statData = await statisticsSequelize.query(query, {
    type: Sequelize.QueryTypes.SELECT,
  });
  return statData;
};

const getAsylumYearsDb = async () => {
  console.log("Years");
  const statData = await statisticsSequelize.query(statByYearQuery, {
    type: Sequelize.QueryTypes.SELECT,
  });
  return statData;
};

module.exports = {
  getAsylumTotalDb,
  getAsylumApplicationsDb,
  getAsylumDecisionsDb,
  getAsylumYearsDb,
};
