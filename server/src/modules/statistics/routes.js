const express = require("express");

const {
  getAsylumYears,
  getAsylumTotal,
  getAsylumDecisions,
  getAsylumApplications,
  uploadBorderCrossFile,
  getBorderCrossTotal,
  getBorderCrossCountries,
  getBorderCrossPeriods,
} = require("./controller");

const statisticsRoute = express.Router();

statisticsRoute.post("/asylum/total", getAsylumTotal);
statisticsRoute.post("/asylum/applications", getAsylumApplications);
statisticsRoute.post("/asylum/decisions", getAsylumDecisions);
statisticsRoute.post("/asylum/years", getAsylumYears);

statisticsRoute.post("/sahmanahatum/upload", uploadBorderCrossFile);
statisticsRoute.post("/sahmanahatum/total", getBorderCrossTotal);
statisticsRoute.post("/sahmanahatum/countries", getBorderCrossCountries);
statisticsRoute.post("/sahmanahatum/periods", getBorderCrossPeriods);

module.exports = statisticsRoute;
