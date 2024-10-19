const { Op, Sequelize } = require("sequelize");

const {
  getWpQuery,
  getEatmQuery,
  getEatmFamilyMemberQuery,
  extractData,
} = require("./helpers");
const { wpSequelize } = require("../../config/wpDatabase");

const getWpDataDB = async (req) => {
  const { pnum } = req.params;

  const wpResponse = await wpSequelize.query(getWpQuery(pnum), {
    type: Sequelize.QueryTypes.SELECT,
  });

  const eatmResponse = await wpSequelize.query(getEatmQuery(pnum), {
    type: Sequelize.QueryTypes.SELECT,
  });

  const eatmFamilyResponse = await wpSequelize.query(
    getEatmFamilyMemberQuery(pnum),
    {
      type: Sequelize.QueryTypes.SELECT,
    }
  );
  console.log("eatmFamilyResponse", eatmFamilyResponse);
  const { cards: wpCards, data: wpData } = extractData(wpResponse);
  const { cards: eatmCards, data: eatmData } = extractData(eatmResponse);
  const { cards: eatmFamilyCards, data: eatmFamilyData } =
    extractData(eatmFamilyResponse);
  console.log("eatmFamilyCards", eatmFamilyCards);
  console.log("eatmFamilyData", eatmFamilyData);
  return {
    wpData,
    eatmData,
    eatmFamilyData,
    cards: [...wpCards, ...eatmCards, ...eatmFamilyCards],
  };
};

module.exports = {
  getWpDataDB,
};
